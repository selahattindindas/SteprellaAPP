import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
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
}
