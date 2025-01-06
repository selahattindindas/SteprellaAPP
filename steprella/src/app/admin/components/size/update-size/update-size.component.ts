import { ChangeDetectionStrategy, Component, inject, viewChild, input, output, model } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UpdateSize } from '../../../../core/models/sizes/update-size';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminSizeService } from '../../../../core/services/admin/admin-size.service';
import { MatInputModule } from '@angular/material/input';
import { effect } from '@angular/core';

@Component({
  selector: 'app-update-size',
  imports: [FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './update-size.component.html',
  styleUrl: './update-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateSizeComponent {
  private readonly adminSizeService = inject(AdminSizeService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly productVariantId = input.required<number>();
  readonly sizeData = input.required<any>();
  readonly sizeUpdated = output<number | null>();
  readonly sizeList = output<void>();

  readonly stockForm = viewChild<NgForm>('stockForm');

  readonly updateSize = model<UpdateSize>({
    id: null,
    productVariantId: null,
    stockQuantity: null
  });

  constructor() {
    effect(() => {
      if (this.sizeData()) {
        this.updateSize.set({ ...this.sizeData() });
      }
    });
  }

  onSubmit(): void {
    const form = this.stockForm();
    if (!form?.valid) return;

    const update: UpdateSize = {
      id: this.sizeData().id,
      productVariantId: this.productVariantId(),
      stockQuantity: form.value.stockQuantity,
    };

    this.adminSizeService.update(update, () => {
      this.sweetAlertService.showMessage();
      this.sizeUpdated.emit(null);
      this.sizeList.emit();
    });
  }
}
