import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, model, output, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ColorService } from '../../../../core/services/ui/color.service';
import { CommonModule } from '@angular/common';
import { CreateProductVariant } from '../../../../core/models/product-variants/create-product-variant';
import { MatButtonModule } from '@angular/material/button';
import { AdminProductVariantService } from '../../../../core/services/admin/admin-product-variant.service';
import { ListColor } from '../../../../core/models/colors/list-color';

@Component({
  selector: 'app-create-product-variant',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatButtonModule],
  standalone: true,
  templateUrl: './create-product-variant.component.html',
  styleUrl: './create-product-variant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductVariantComponent {
  private readonly colorService = inject(ColorService);
  private readonly adminProductVariantService = inject(AdminProductVariantService);

  readonly variantForm = viewChild<NgForm>('variantForm');

  readonly productId = input.required<number>();
  readonly variantList = output<void>();

  readonly colors = signal<ListColor[]>([]);
  readonly createVariant = model<CreateProductVariant>({
    productId: null,
    colorId: null,
    active: false
  });

  constructor() {
    effect(() => {
      this.loadColors();
      this.createVariant.update(current => ({
        ...current,
        productId: this.productId()
      }));
    });
  }

  private loadColors(): void {
    this.colorService.getAll().subscribe({
      next: (colors) => this.colors.set(colors)
    });
  }

  onSubmit(): void {
    const form = this.variantForm();
    if (!form?.valid) return;

    const variantData: CreateProductVariant = {
      productId: this.productId(),
      colorId: form.value.colorId,
      active: false
    };

    this.adminProductVariantService.create(variantData, () => {
      form.reset();
      this.variantList.emit();
    });
  }
}
