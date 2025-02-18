import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCart } from '../../../core/models/carts/list-cart';
import { CartHeaderComponent } from '../../pages/cart/cart-header/cart-header.component';
import { CartItemComponent } from '../../pages/cart/cart-item/cart-item.component';
import { CartFooterComponent } from '../../pages/cart/cart-footer/cart-footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartHeaderComponent,
    CartItemComponent,
    CartFooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  isOpen = signal(false);
  selectedItemIds = signal<number[]>([]);
  cart = signal<ListCart>({
    id: 1,
    totalPrice: 46.00,
    totalItems: 2,
    cartItems: [
      {
        id: 1,
        cartId: 1,
        inStock: true,
        productVariantSizeValue: 38,
        quantity: 1,
        unitPrice: 21.00,
        totalPrice: 21.00,
        productVariant: {
          ratingCount: 12,
          rating: 4.5,
          description: "Perfect for special occasions",
          brandName: "Sparkle",
          shoeModelName: "Party Heels",
          materialName: "Synthetic",
          usageAreaName: "Party",
          colorName: "Red",
          active: true,
          productFiles: [
            {
              id: 1,
              fileName: "sparkling-heels.jpg",
              path: "image/jpeg",
            }
          ]
        }
      },
      {
        id: 2,
        cartId: 1,
        inStock: true,
        productVariantSizeValue: 42,
        quantity: 1,
        unitPrice: 25.00,
        totalPrice: 25.00,
        productVariant: {
          ratingCount: 28,
          rating: 4.8,
          description: "Waterproof hiking boots",
          brandName: "TrailMaster",
          shoeModelName: "Hiking Boots",
          materialName: "Leather",
          usageAreaName: "Outdoor",
          colorName: "Brown",
          active: true,
          productFiles: [
            {
              id: 2,
              fileName: "hiking-boots.jpg",
              path: "image/jpeg",
            }
          ]
        }
      }
    ]
  });

  @HostListener('document:keydown.escape')
  onEscapePressed() {
    this.isOpen.set(false);
  }

  toggleItemSelection(itemId: number) {
    this.selectedItemIds.update(currentIds => {
      if (currentIds.includes(itemId)) {
        // Item zaten seçiliyse, seçimi kaldır
        return currentIds.filter(id => id !== itemId);
      } else {
        // Item seçili değilse, seç
        return [...currentIds, itemId];
      }
    });
  }

  getSelectedItemsTotal(): number {
    return this.cart().cartItems
      .filter(item => this.selectedItemIds().includes(item.id))
      .reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }

  selectAllItems() {
    const allItemIds = this.cart().cartItems.map(item => item.id);
    this.selectedItemIds.set(allItemIds);
  }

  clearSelection() {
    this.selectedItemIds.set([]);
  }

  removeSelectedItems() {
    this.cart.update(cart => ({
      ...cart,
      cartItems: cart.cartItems.filter(item => !this.selectedItemIds().includes(item.id))
    }));
    this.clearSelection();
    this.updateTotals();
  }


  updateQuantity(itemId: number, change: number) {
    this.cart.update(cart => ({
      ...cart,
      cartItems: cart.cartItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity
          };
        }
        return item;
      })
    }));
    this.updateTotals();
  }

  removeItem(itemId: number) {
    this.cart.update(cart => ({
      ...cart,
      cartItems: cart.cartItems.filter(item => item.id !== itemId)
    }));
    this.updateTotals();
  }

  private updateTotals() {
    this.cart.update(cart => ({
      ...cart,
      totalItems: cart.cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cart.cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
    }));
  }
}
