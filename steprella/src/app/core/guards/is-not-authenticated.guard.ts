import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { isAuthenticated, isVerified } = authService.checkAuthAndVerification();
  const isAdminPath = state.url.startsWith('/admin');

  if (isAuthenticated) {
    if (isVerified) {
      if (isAdminPath) {
        router.navigate(['/admin']);
      } else {
        router.navigate(['/']);
      }
    } else {
      router.navigate(['/verify-code']);
    }
    return false;
  }

  return true;
}; 