import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { roleGuard } from '../core/guards/role.guard';
import { authGuard } from '../core/guards/auth.guard';
import { UserRole } from '../core/types/auth.types';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        title: 'Steprella: Admin Panel Ana Sayfa',
        canActivate: [authGuard, roleGuard(UserRole.ADMIN)],
        children:[
            {
                path: '',
                loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'products',
                loadComponent: () => import('./components/products/list-product/list-product.component').then(m => m.ListProductComponent)
            },
            {
                path: 'users',
                loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
            },
            {
                path: 'brand',
                loadComponent: () => import('./components/brands/list-brand/list-brand.component').then(m => m.ListBrandComponent),
            }
        ]
    }
];
