import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductFormComponent } from '../../../shared/product-form/product-form.component';
import { ProductService } from '../../../../core/services/ui/product.service';
import { UpdateProduct } from '../../../../core/models/products/update-product';
import { MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminProductService } from '../../../../core/services/admin/admin-product.service';

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
  private readonly adminProductService = inject(AdminProductService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly data = inject<{ id: number }>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<UpdateProductComponent>);

  readonly listProduct$ = this.productService.getById(this.data.id);

  onSubmit(formData: UpdateProduct) {
    formData.id = this.data.id;
    this.adminProductService.update(formData, () => {
      this.sweetAlertService.showMessage();
      this.dialogRef.close();
    });
  }
}
