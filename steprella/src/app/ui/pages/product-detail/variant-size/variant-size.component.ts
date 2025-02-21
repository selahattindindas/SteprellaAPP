import { ChangeDetectionStrategy, Component, input, output, EventEmitter, Output } from '@angular/core';
import { ListProduct } from '../../../../core/models/products/list-product';
import { CommonModule } from '@angular/common';
import { ListSize } from '../../../../core/models/sizes/list-size';

@Component({
  selector: 'app-variant-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './variant-size.component.html',
  styleUrl: './variant-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantSizeComponent {
  readonly product = input<ListProduct | null>(null);
  readonly variantId = input<number | null>(null);
  readonly sizeSelected = output<number>();
  
  selectedSize: ListSize | null = null;
  selectedSizeId: number | null = null;

  getSelectedVariantSizes() {
    return this.product()?.productVariants.find(v => v.id === this.variantId())?.productSizes || [];
  }

  onSizeSelect(sizeId: number) {
    this.selectedSizeId = sizeId;
    this.sizeSelected.emit(sizeId);
  }
}
