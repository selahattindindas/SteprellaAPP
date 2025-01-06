import { ChangeDetectionStrategy, Component, inject, input, output, viewChild, effect, model } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateSize } from '../../../../core/models/sizes/create-size';
import { MatButtonModule } from '@angular/material/button';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminSizeService } from '../../../../core/services/admin/admin-size.service';

@Component({
  selector: 'app-create-size',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './create-size.component.html',
  styleUrl: './create-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSizeComponent {
  private readonly adminSizeService = inject(AdminSizeService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly productVariantId = input.required<number>();
  readonly sizeList = output<void>();

  readonly stockForm = viewChild<NgForm>('stockForm');

  readonly createSize = model<CreateSize>({
    productVariantId: null,
    sizeValue: null,
    stockQuantity: null
  });

  constructor() {
    effect(() => {
      this.createSize.update(current => ({
        ...current,
        productVariantId: this.productVariantId()
      }));
    });
  }

  onSubmit(): void {
    const form = this.stockForm();
    if (!form?.valid) return;

    const formData = form.value;
    const create: CreateSize = {
      productVariantId: this.productVariantId(),
      sizeValue: formData.sizeValue,
      stockQuantity: formData.stockQuantity
    };

    this.adminSizeService.create(create, () => {
      this.sweetAlertService.showMessage();
      form.reset();
      this.sizeList.emit();
    });
  }
}
