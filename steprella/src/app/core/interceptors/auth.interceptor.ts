import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly PUBLIC_ROUTES = ['/auth/login', '/auth/register'];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isPublicRoute(request.url)) {
      return next.handle(this.addCredentials(request));
    }

    return this.handleAuthenticatedRequest(request, next);
  }

  private isPublicRoute(url: string): boolean {
    return this.PUBLIC_ROUTES.some(route => url.includes(route));
  }

  private addCredentials(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({ withCredentials: true });
  }

  private handleAuthenticatedRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (!token) {
      return next.handle(request);
    }

    const authenticatedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authenticatedRequest);
  }
}
