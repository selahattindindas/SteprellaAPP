import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'admin/login',
        loadComponent: () => import('./admin/components/auth/auth.component').then(m => m.AuthComponent),
        title: 'Steprella Admin Panel Giriş Sayfası',
        canActivate: [isNotAuthenticatedGuard],
    },

    {
        path: 'verify-code',
        loadComponent: () => import('./shared/components/verify-code/verify-code.component')
            .then(m => m.VerifyCodeComponent),
        title: 'Email Doğrulama',
        canActivate: [authGuard] 
    },

    { 
        path: 'admin', 
        loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)
    },

    {
        path: '',
        loadChildren: () => import('./ui/user.routes').then(m => m.userRoutes)
    },
];
