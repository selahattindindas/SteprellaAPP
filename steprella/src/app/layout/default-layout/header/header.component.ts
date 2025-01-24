import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from '../features/components/main-nav/main-nav.component';
import { MobileSidebarComponent } from '../features/components/mobile-sidebar/mobile-sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MainNavComponent, MobileSidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild(MobileSidebarComponent) mobileSidebar!: MobileSidebarComponent;

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
}
