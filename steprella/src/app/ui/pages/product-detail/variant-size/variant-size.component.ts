import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  
  selectedSize: ListSize | null = null;

  getSelectedVariantSizes() {
    return this.product()?.productVariants.find(v => v.id === this.variantId())?.productSizes || [];
  }

  selectSize(size: ListSize) {
    this.selectedSize = size;
  }
}
