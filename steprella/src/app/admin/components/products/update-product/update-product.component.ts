import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductFormComponent } from '../../../shared/product-form/product-form.component';
import { ProductService } from '../../../../core/services/common/product.service';
import { UpdateProduct } from '../../../../core/models/products/update-product';
import { MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-update-product',
  imports: [ProductFormComponent, MatDialogTitle, MatDialogContent, MatDialogActions],
  standalone: true,
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductComponent {
  private readonly productService = inject(ProductService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly data = inject<{ id: number }>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<UpdateProductComponent>);

  listProduct$ = this.productService.getById(this.data.id);

  onSubmit(formData: UpdateProduct) {
    this.productService.update(formData,
      () => {
        this.sweetAlertService.showMessage();
        this.dialogRef.close();
      }
    )
  }
}
