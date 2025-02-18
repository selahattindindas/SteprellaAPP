import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from '../features/components/main-nav/main-nav.component';
import { MobileSidebarComponent } from '../features/components/mobile-sidebar/mobile-sidebar.component';
import { RouterLink } from '@angular/router';
import { UserDropdownComponent } from '../features/components/user-dropdown/user-dropdown.component';
import { CartComponent } from '../../../ui/components/cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MainNavComponent,
    MobileSidebarComponent,
    RouterLink,
    UserDropdownComponent,
    CartComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild(MobileSidebarComponent) mobileSidebar!: MobileSidebarComponent;
  @ViewChild('cart') cart!: CartComponent;

  isMobileMenuOpen = false;
  isSubmenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isSubmenuOpen = false;
    }
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
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
    this.mobileSidebar.toggleSidebar();
  }

  toggleCart() {
    this.cart.isOpen.set(!this.cart.isOpen());
  }
}
