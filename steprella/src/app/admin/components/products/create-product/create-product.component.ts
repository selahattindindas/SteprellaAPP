import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreateProduct } from '../../../../core/models/products/create-product';
import { ProductFormComponent } from '../../../shared/product-form/product-form.component';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminProductService } from '../../../../core/services/admin/admin-product.service';

@Component({
  selector: 'app-create-product',
  imports: [ProductFormComponent, MatDialogTitle, MatDialogContent, MatDialogActions],
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductComponent {
  private readonly adminProductService = inject(AdminProductService);
  private readonly dialogRef = inject(MatDialogRef<CreateProductComponent>);
  private readonly sweetAlertService = inject(SweetAlertService);

  onSubmit(formData: CreateProduct) {
    this.adminProductService.create(formData, () => {
      this.sweetAlertService.showMessage();
      this.dialogRef.close();
    });
  }
}
