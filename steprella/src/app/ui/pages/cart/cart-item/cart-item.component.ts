import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ListCartItem } from '../../../../core/models/cart-items/list-cart-item';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  readonly data = input.required<ListCartItem>();
  readonly selectedItems = input<number[]>([]);

  updateQuantity = output<{itemId: number, change: number}>();
  removeItem = output<number>();
  toggleSelect = output<number>();

  onUpdateQuantity(itemId: number, change: number) {
    this.updateQuantity.emit({ itemId, change });
  }

  onRemoveItem(itemId: number) {
    this.removeItem.emit(itemId);
  }

  onToggleSelect(itemId: number) {
    this.toggleSelect.emit(itemId);
  }

  isSelected(itemId: number): boolean {
    return this.selectedItems()?.includes(itemId) ?? false;
  }
}
