import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();
  const { isAuthenticated } = authService.checkAuthAndVerification();

  if (token && isAuthenticated) {
    return true; 
  }

  const redirectPath = state.url.startsWith('/admin') ? '/admin/login' : '/auth';
  router.navigate([redirectPath], { queryParams: { returnUrl: state.url } });
  return false; 
};