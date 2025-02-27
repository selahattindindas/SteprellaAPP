import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ListProduct } from '../../../../core/models/products/list-product';
import { ListProductVariant } from '../../../../core/models/product-variants/list-product-variant';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantitySelectorComponent {
  readonly product = input<ListProduct | null>(null);
  readonly selectedVariant = input<ListProductVariant | null>(null);
  
  readonly submit = output<void>();
  
  readonly quantityChange = output<number>();
  readonly favoriteClick = output<void>();
  
  protected readonly min = 1;
  protected readonly max = 5;

  quantity = signal(1);

  onFavoriteClick() {
    this.favoriteClick.emit();
  }
  
  updateQuantity(increment: boolean) {
    const current = this.quantity();
    if (increment && current < this.max) {
      this.quantity.set(current + 1);
    } else if (!increment && current > this.min) {
      this.quantity.set(current - 1);
    }
    this.quantityChange.emit(this.quantity());
  }
}
