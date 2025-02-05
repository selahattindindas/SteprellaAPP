import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../layout/default-layout/default-layout.component';

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
                path: 'detay/:id',
                loadComponent: () => import('./components/products/product-detail/product-detail.component')
                .then(m => m.ProductDetailComponent)
            }
        ]
    }
];
