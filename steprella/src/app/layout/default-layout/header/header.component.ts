import { ChangeDetectionStrategy, Component, ViewChild, inject, signal, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MainNavComponent } from '../features/components/main-nav/main-nav.component';
import { MobileSidebarComponent } from '../features/components/mobile-sidebar/mobile-sidebar.component';
import { RouterLink } from '@angular/router';
import { UserDropdownComponent } from '../features/components/user-dropdown/user-dropdown.component';
import { CartComponent } from '../../../ui/components/cart/cart.component';
import { CartService } from '../../../core/services/ui/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MainNavComponent,
    MobileSidebarComponent,
    RouterLink,
    UserDropdownComponent,
    CartComponent,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  mobileSidebar = viewChild<MobileSidebarComponent>(MobileSidebarComponent);
  cart = viewChild<CartComponent>(CartComponent);

  isMobileMenuOpen = signal<boolean>(false);
  isSubmenuOpen = signal<boolean>(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    if (!this.isMobileMenuOpen()) {
      this.isSubmenuOpen.set(false);
    }
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.mobile-sidebar');
    sidebar?.classList.toggle('active');
  }

  closeSidebar() {
    const sidebar = document.querySelector('.mobile-sidebar');
    sidebar?.classList.remove('active');
  }

  toggleMobileSidebar() {
    this.mobileSidebar()?.toggleSidebar();
  }

  toggleCart() {
    this.cart()?.isOpen.set(!this.cart()?.isOpen());
  }

  get totalCount() {
    return this.cart()?.listCart()?.totalItems || 0;
  }
}
