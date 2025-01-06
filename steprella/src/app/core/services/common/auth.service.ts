import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UserPayload, UserRole } from '../../types/auth.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  private readonly cookieService = inject(CookieService);

  private currentUser = new BehaviorSubject<UserPayload | null>(null);
  currentUser$ = this.currentUser.asObservable();

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor() {
    const token = this.getToken();
    if (token) {
      const payload = this.getUserPayload();
      this.currentUser.next(payload);
      this.isAuthenticated.next(true);
    }
  }

  setToken(token: string, type: 'accessToken' | 'refreshToken'): void {
    if (!token) return;

    this.cookieService.set(type, token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      domain: 'localhost'
    });

    if (type === 'accessToken') {
      const payload = this.getUserPayload();
      this.currentUser.next(payload);
      this.isAuthenticated.next(true);
    }
  }

  getToken(): string | null {
    const token = this.cookieService.get('accessToken');
    if (token && this.jwtHelper.isTokenExpired(token)) {
      this.deleteToken();
      return null;
    }
    return token || null;
  }

  getRefreshToken(): string | null {
    const refreshToken = this.cookieService.get('refreshToken');
    if (refreshToken && this.jwtHelper.isTokenExpired(refreshToken)) {
      this.deleteToken();
      return null;
    }
    return refreshToken || null;
  }

  deleteToken(): void {
    this.cookieService.delete('accessToken', '/');
    this.cookieService.delete('refreshToken', '/');
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
  }

  getUserPayload(): UserPayload | null {
    const token = this.getToken();
    if (!token) return null;
    
    const decoded = this.jwtHelper.decodeToken(token);
    
    return {
      phone: decoded.phone,
      fullName: decoded.fullName,
      sub: decoded.sub,
      role: decoded.role,
      iat: decoded.iat,
      exp: decoded.exp
    } as UserPayload;
  }

  hasRole(requiredRole: UserRole): boolean {
    const payload = this.getUserPayload();
    return payload?.role === requiredRole;
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}