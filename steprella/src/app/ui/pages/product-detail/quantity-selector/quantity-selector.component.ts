import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ListProduct } from '../../../../core/models/products/list-product';

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

  readonly submit = output<void>();
  
  readonly quantityChange = output<number>();
  
  protected readonly min = 1;
  protected readonly max = 5;

  quantity = signal(1);
  
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
