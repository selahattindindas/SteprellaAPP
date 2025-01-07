import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';
import { UserRole } from '../types/auth.types';

export const roleGuard = (requiredRole: UserRole): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const { isAuthenticated, isVerified } = authService.checkAuthAndVerification();
    const hasRequiredRole = authService.hasRole(requiredRole);

    if (!isAuthenticated) {
      router.navigate(['/login']);
      return false;
    }

    if (!isVerified) {
      router.navigate(['/verify-code']);
      return false;
    }

    if (!hasRequiredRole) {
      router.navigate(['/unauthorized']); 
      return false;
    }

    return true;
  };
};

export const adminGuard = roleGuard(UserRole.ADMIN);
export const userGuard = roleGuard(UserRole.CUSTOMER);