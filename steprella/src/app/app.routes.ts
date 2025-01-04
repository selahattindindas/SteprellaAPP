import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'admin', 
        loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)
    },

    {
        path: 'admin/login',
        loadComponent: () => import('./admin/components/auth/auth.component').then(m => m.AuthComponent),
        title: 'Steprella Admin Panel Giriş Sayfası',
    },
];
