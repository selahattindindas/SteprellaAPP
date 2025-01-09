import { Component, viewChild, type ElementRef, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sidenavRef = viewChild<ElementRef>('sidenav');
  private readonly BREAKPOINT = 1600;

  readonly isSidebarCollapsed = signal<boolean>(false);
  readonly isOpen = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.handleResize();
      window.addEventListener('resize', () => this.handleResize());
    }
  }

  private handleResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isSmallScreen = window.innerWidth < this.BREAKPOINT;
      this.isSidebarCollapsed.set(isSmallScreen);
      this.isOpen.set(!isSmallScreen);
    }
  }

  toggleSidebar(): void {
    if (this.isSidebarCollapsed()) {
      this.isOpen.update(state => !state);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside({ target }: MouseEvent): void {
    const element = target as HTMLElement;
    const isOutsideClick = this.sidenavRef() && 
                          this.isSidebarCollapsed() && 
                          this.isOpen() &&
                          !this.sidenavRef()?.nativeElement.contains(element) &&
                          !element.closest('.sidebar-toggle-button');

    if (isOutsideClick) {
      this.isOpen.set(false);
    }
  }

  @HostListener('window:keydown.escape')
  onEscapePress(): void {
    if (this.isSidebarCollapsed() && this.isOpen()) {
      this.isOpen.set(false);
    }
  }
}