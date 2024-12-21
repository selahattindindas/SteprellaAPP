import { Routes } from '@angular/router';
import { ListProductComponent } from './admin/components/products/list-product/list-product.component';
import { UpdateProductVariantComponent } from './admin/components/product-variants/update-product-variant/update-product-variant.component';

export const routes: Routes = [
    { path: 'product', component: ListProductComponent},
    { path: 'variant-edit/:id', component: UpdateProductVariantComponent},
];
