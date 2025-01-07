import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { isAuthenticated, isVerified } = authService.checkAuthAndVerification();

  if (isAuthenticated) {

    if (isVerified) {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/verify-code']);
    }
    return false;
  }

  return true;
}; 