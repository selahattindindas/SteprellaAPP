import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../layout/default-layout/default-layout.component';
import { authGuard } from '../core/guards/auth.guard';
import { isNotAuthenticatedGuard } from '../core/guards/is-not-authenticated.guard';

export const userRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        title: 'Steprella | Online Ayakkabı Alışverişi',
        children: [
            {
                path: '',
                loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'auth',
                loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent),
                canActivate: [isNotAuthenticatedGuard]
            },
            {
                path: 'favorites',
                loadComponent: () => import('./components/favorite/favorite.component').then(m => m.FavoriteComponent),
                canActivate: [authGuard]
            },
            {
                path: 'carts',
                loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
                canActivate: [authGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./components/profile/profile-main/profile-main.component').then(m => m.ProfileMainComponent),
                // canActivate: [authGuard],
                // canActivateChild: [authGuard],
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'orders'
                    },
                    {
                        path: 'orders',
                        loadComponent: () => import('./components/profile/order/order.component').then(m => m.OrderComponent)
                    },
                    {
                        path: 'addresses',
                        loadComponent: () => import('./components/profile/address/address.component').then(m => m.AddressComponent)
                    },
                    {
                        path: 'reviews',
                        loadComponent: () => import('./components/profile/review/review.component').then(m => m.ReviewComponent)
                    },
                    {
                        path: 'info',
                        loadComponent: () => import('./components/profile/profile-detail/profile-detail.component').then(m => m.ProfileDetailComponent)
                    },
                ]
            },
            {
                path: '',
                loadComponent: () => import('./components/products/product-main/product-main.component')
                    .then(m => m.ProductMainComponent),
                children: [
                    {
                        path: 'search',
                        loadComponent: () => import('./components/search/search.component')
                            .then(m => m.SearchComponent)
                    },
                    {
                        path: ':mainCategory',
                        loadComponent: () => import('./components/products/product-filter/product-filter.component')
                            .then(m => m.ProductFilterComponent),
                        data: {
                            queryParams: [
                                'brandId',
                                'colorId',
                                'sizeValue',
                                'materialId',
                                'usageAreaId',
                                'minPrice',
                                'maxPrice',
                                'genderId'
                            ]
                        }
                    }
                ]
            },
            {
                path: 'product/:id/:variantId',
                loadComponent: () => import('./components/products/product-detail/product-detail.component')
                    .then(m => m.ProductDetailComponent)
            }
        ]
    }
];
