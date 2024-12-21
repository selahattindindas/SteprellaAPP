import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreateProduct } from '../../../../core/models/products/create-product';
import { ProductService } from '../../../../core/services/common/product.service';
import { ProductFormComponent } from '../../../shared/product-form/product-form.component';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product',
  imports: [ProductFormComponent, MatDialogTitle, MatDialogContent],
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductComponent{
  private readonly productService = inject(ProductService);
  private readonly dialogRef = inject(MatDialogRef<CreateProductComponent>);
  
  onSubmit(formData: CreateProduct) {
    this.productService.create(formData, () => {
      console.log("Başarıyla eklendi");
      this.dialogRef.close();
    }, (errorMessage) => {
      console.error("Hata: ", errorMessage);
    });
  }
}
