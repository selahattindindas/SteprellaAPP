import { Routes } from '@angular/router';
import { ListProductComponent } from './admin/components/products/list-product/list-product.component';
import { ListBrandComponent } from './admin/components/brands/list-brand/list-brand.component';

export const routes: Routes = [
    { path: 'product', component: ListProductComponent},
    { path: 'brand', component: ListBrandComponent }
];
