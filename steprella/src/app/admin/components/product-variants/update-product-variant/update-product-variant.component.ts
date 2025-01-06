import { ChangeDetectionStrategy, Component, inject, input, output, viewChild, OnInit, effect, model } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { UpdateProductVariant } from '../../../../core/models/product-variants/update-product-variant';
import { AdminProductVariantService } from '../../../../core/services/admin/admin-product-variant.service';

@Component({
  selector: 'app-update-product-variant',
  imports: [FormsModule, MatIconModule, MatButtonModule, MatRadioModule],
  standalone: true,
  templateUrl: './update-product-variant.component.html',
  styleUrl: './update-product-variant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductVariantComponent {
  private readonly adminProductVariantService = inject(AdminProductVariantService);

  readonly variantForm = viewChild<NgForm>('variantForm');

  readonly productId = input.required<number>();
  readonly variantData = input.required<any>();
  readonly variantUpdated = output<number | null>();
  readonly variantList = output<void>();

readonly updateVariant = model<UpdateProductVariant>({
    id: null,
    productId: null,
    active: null
  });

  constructor() {
    effect(() => {
      if (this.variantData()) {
        this.updateVariant.set({ ...this.variantData() });
      }
    });
  }

  onActiveChange(newValue: boolean): void {
    const update: UpdateProductVariant = {
      id: this.variantData().id,
      productId: this.productId(),
      active: newValue
    };

    this.adminProductVariantService.update(update, () => {
      this.variantUpdated.emit(null);
      this.variantList.emit();
    });
  }
}
