import { AuthService } from '../services/common/auth.service';
import { Router } from '@angular/router';

export function initializeAuth(authService: AuthService, router: Router) {
  return () => {
    const currentPath = router.url;
    const isAdminPath = currentPath.startsWith('/admin');
    const isAuthPath = currentPath.includes('/auth') || currentPath.includes('/admin/login');
    
    const { isAuthenticated, isVerified } = authService.checkAuthAndVerification();

    if (!isAuthenticated && !isAuthPath) {
      if (isAdminPath) {
        router.navigate(['/admin/login']);
      } else {
        router.navigate(['/auth'], { queryParams: { type: 'login' } });
      }
      return Promise.reject('Unauthorized');
    }

    if (isAuthenticated && !isVerified && !currentPath.includes('/verify-code')) {
      router.navigate(['/verify-code']);
      return Promise.reject('Unverified');
    }

    if (isAuthenticated && isVerified && isAuthPath) {
      if (isAdminPath) {
        router.navigate(['/admin']);
      } else {
        router.navigate(['/']);
      }
      return Promise.reject('Already authenticated');
    }

    return Promise.resolve(true);
  };
} 