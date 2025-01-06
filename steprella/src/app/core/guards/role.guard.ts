import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';
import { UserRole } from '../types/auth.types';

export const roleGuard = (requiredRole: UserRole): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isTokenValid() && authService.hasRole(requiredRole)) {
      return true;
    }

    return false;
  };
}; 