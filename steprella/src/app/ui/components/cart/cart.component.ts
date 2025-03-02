import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCart } from '../../../core/models/carts/list-cart';
import { CartHeaderComponent } from '../../pages/cart/cart-header/cart-header.component';
import { CartItemComponent } from '../../pages/cart/cart-item/cart-item.component';
import { CartFooterComponent } from '../../pages/cart/cart-footer/cart-footer.component';
import { SweetAlertService } from '../../../core/services/common/sweet-alert.service';
import { CartService } from '../../../core/services/ui/cart.service';
import { CartItemService } from '../../../core/services/ui/cart-item.service';
import { UpdateCartItem } from '../../../core/models/cart-items/update-cart-item';
import { AuthService } from '../../../core/services/common/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CartHeaderComponent,
    CartItemComponent,
    CartFooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly cartService = inject(CartService);
  private readonly cartItemService = inject(CartItemService);
  private readonly authService = inject(AuthService);

  listCart = signal<ListCart | null>(null);

  isOpen = signal(false);
  selectedItemIds = signal<number[]>([]);
  isAuthenticated = signal(false);

  @HostListener('document:keydown.escape')
  onEscapePressed() {
    this.isOpen.set(false);
  }

  ngOnInit(): void {
    this.isAuthenticated.set(this.authService.isUserAuthenticated());
    if (this.isAuthenticated()) {
      this.loadCart();

      this.cartService.cartUpdate$.subscribe(() => {
        this.loadCart();
      });

      this.cartService.cartOpen$.subscribe(isOpen => {
        this.isOpen.set(isOpen);
      });
    }
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.listCart.set(response);
      },
    });
  }

  remove(id: number) {
    this.sweetAlertService.confirmation().then(result => {
      if (result.isConfirmed) {
        this.cartItemService.delete(id).subscribe({
          next: () => {
            this.sweetAlertService.showMessage();
            this.loadCart();
          }
        })
      }
    })
  }

  updateQuantity(itemId: number, change: number) {
    const item = this.listCart()?.cartItems.find(item => item.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) return;

    const updateData: UpdateCartItem = {
      id: item.id,
      productVariantId: item.product.variantId,
      productVariantSizeId: item.sizeId, 
      quantity: newQuantity
    };

    this.cartItemService.update(updateData).subscribe({
      next: () => {
        this.loadCart();
      }
    });
  }
}
