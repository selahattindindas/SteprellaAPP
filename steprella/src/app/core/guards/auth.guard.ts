import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const currentPath = route.routeConfig?.path;
  const { isAuthenticated, isVerified } = authService.checkAuthAndVerification();

  const isAuthPage = currentPath === 'admin/login' || currentPath === 'verify-code';

  if (currentPath === 'admin/login') {
    if (isAuthenticated) {
      if (isVerified) {
        router.navigate(['/admin']);
      } else {
        router.navigate(['/verify-code']);
      }
      return false;
    }
    return true;
  }

  if (currentPath === 'verify-code') {
    if (!isAuthenticated) {
      router.navigate(['/admin/login']);
      return false;
    }
    if (isVerified) {
      router.navigate(['/admin']);
      return false;
    }
    return true;
  }

  if (!isAuthenticated) {
    router.navigate(['/admin/login'], {
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