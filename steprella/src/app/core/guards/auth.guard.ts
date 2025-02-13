import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const currentPath = route.routeConfig?.path;
  const { isAuthenticated, isVerified } = authService.checkAuthAndVerification();

  const isAuthPage = currentPath === 'admin/login' || currentPath === 'auth' || currentPath === 'verify-code';
  const isAdminPath = state.url.startsWith('/admin');

  if (currentPath === 'admin/login' || currentPath === 'auth') {
    if (isAuthenticated) {
      if (isVerified) {
        router.navigate([isAdminPath ? '/admin' : '/']);
      } else {
        router.navigate(['/verify-code']);
      }
      return false;
    }
    return true;
  }

  if (currentPath === 'verify-code') {
    if (!isAuthenticated) {
      router.navigate([isAdminPath ? '/admin/login' : '/auth']);
      return false;
    }
    if (isVerified) {
      router.navigate([isAdminPath ? '/admin' : '/']);
      return false;
    }
    return true;
  }

  if (!isAuthenticated) {
    router.navigate([isAdminPath ? '/admin/login' : '/auth'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  if (!isVerified && !isAuthPage) {
    router.navigate(['/verify-code']);
    return false;
  }

  return true;
};