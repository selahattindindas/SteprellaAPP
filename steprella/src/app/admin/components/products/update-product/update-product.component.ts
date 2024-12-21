import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductFormComponent } from '../../../shared/product-form/product-form.component';
import { ProductService } from '../../../../core/services/common/product.service';
import { UpdateProduct } from '../../../../core/models/products/update-product';
import { Observable } from 'rxjs';
import { ListProduct } from '../../../../core/models/products/list-product';
import { MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-product',
  imports: [ProductFormComponent, MatDialogTitle, MatDialogContent],
  standalone: true,
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductComponent {
  readonly productService = inject(ProductService);
  readonly data = inject<{ id: number }>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<UpdateProductComponent>);

  listProduct$ = this.productService.getById(this.data.id);

  onSubmit(formData: UpdateProduct) {
    this.productService.update(formData, () => {
      console.log("Başarıyla güncellendi");
      this.dialogRef.close();
    }, (errorMessage) => {
      console.error("Hata: ", errorMessage);
    });
  }
}
