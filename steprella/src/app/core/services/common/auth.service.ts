import { inject, Injectable, signal, computed } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UserPayload, UserRole } from '../../types/auth.types';
import { toObservable } from '@angular/core/rxjs-interop';

interface CookieOptions {
  path: string;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
  domain: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  private readonly cookieService = inject(CookieService);

  private readonly cookieOptions: CookieOptions = {
    path: '/',
    secure: true,
    sameSite: 'Strict',
    domain: 'localhost'
  };

  // Auth state signals
  private readonly currentUser = signal<UserPayload | null>(null);
  private readonly isAuthenticated = signal(false);
  private readonly isVerified = signal(false);

  // Public observables
  readonly currentUser$ = toObservable(this.currentUser);
  readonly isAuthenticated$ = toObservable(this.isAuthenticated);
  readonly isVerified$ = toObservable(this.isVerified);

  // Computed states
  readonly authState = computed(() => ({
    isAuthenticated: this.isAuthenticated(),
    isVerified: this.isVerified(),
    currentUser: this.currentUser()
  }));

  constructor() {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    const isVerified = this.cookieService.get('isVerified') === 'true';

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const payload = this.getUserPayload();
      this.currentUser.set(payload);
      this.isAuthenticated.set(true);
      this.isVerified.set(isVerified);
    } else {
      this.deleteAllTokens();
    }
  }

  private setCookie(name: string, value: string): void {
    this.cookieService.set(name, value, this.cookieOptions);
  }

  private deleteCookie(name: string): void {
    this.cookieService.delete(name, this.cookieOptions.path);
  }

  setToken(token: string, type: 'accessToken' | 'refreshToken'): void {
    if (!token) return;

    this.setCookie(type, token);

    if (type === 'accessToken') {
      const payload = this.getUserPayload();
      this.currentUser.set(payload);
      this.isAuthenticated.set(true);
      
      // Eğer önceden verify olmuşsa, bu durumu koru
      const isVerified = this.cookieService.get('isVerified') === 'true';
      this.isVerified.set(isVerified);
    }
  }

  getToken(): string | null {
    const token = this.cookieService.get('accessToken');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.deleteAllTokens();
      return null;
    }
    return token;
  }

  getRefreshToken(): string | null {
    const token = this.cookieService.get('refreshToken');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.deleteAllTokens();
      return null;
    }
    return token;
  }

  setVerificationEmail(email: string | null): void {
    if (email) {
      this.setCookie('verificationEmail', email);
    } else {
      this.deleteCookie('verificationEmail');
    }
  }

  getVerificationEmail(): string | null {
    return this.cookieService.get('verificationEmail') || null;
  }

  setVerified(value: boolean): void {
    this.setCookie('isVerified', value.toString());
    this.isVerified.set(value);
  }

  checkAuthAndVerification(): { isAuthenticated: boolean; isVerified: boolean } {
    const token = this.getToken();
    const isVerified = this.cookieService.get('isVerified') === 'true';

    // Token varsa ve geçerliyse
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return {
        isAuthenticated: true,
        isVerified: isVerified
      };
    }

    // Token yoksa veya geçersizse
    this.deleteAllTokens();
    return {
      isAuthenticated: false,
      isVerified: false
    };
  }

  private deleteAllTokens(): void {
    const cookiesToDelete = ['accessToken', 'refreshToken', 'isVerified', 'verificationEmail'];
    cookiesToDelete.forEach(cookie => this.deleteCookie(cookie));
    
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.isVerified.set(false);
  }

  deleteToken(): void {
    this.deleteAllTokens();
  }

  getUserPayload(): UserPayload | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      return {
        phone: decoded.phone,
        fullName: decoded.fullName,
        sub: decoded.sub,
        role: decoded.role,
        iat: decoded.iat,
        exp: decoded.exp
      } as UserPayload;
    } catch (error) {
      this.deleteAllTokens();
      return null;
    }
  }

  hasRole(requiredRole: UserRole): boolean {
    return this.currentUser()?.role === requiredRole;
  }

  // Public getters
  getAuthState() {
    return this.authState();
  }

  isUserVerified(): boolean {
    return this.isVerified();
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated();
  }
}