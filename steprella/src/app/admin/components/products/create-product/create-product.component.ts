import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreateProduct } from '../../../../core/models/products/create-product';
import { ProductService } from '../../../../core/services/common/product.service';
import { ProductFormComponent } from '../../../shared/product-form/product-form.component';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-create-product',
  imports: [ProductFormComponent, MatDialogTitle, MatDialogContent, MatDialogActions],
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductComponent {
  private readonly productService = inject(ProductService);
  private readonly dialogRef = inject(MatDialogRef<CreateProductComponent>);
  private readonly sweetAlertService = inject(SweetAlertService);

  async onSubmit(formData: CreateProduct) {
    await firstValueFrom(this.productService.create(formData,
      () => {
        this.sweetAlertService.showMessage();
        this.dialogRef.close();
      },
      error => {
      }
    ));

  }
}
