import { Component, HostListener, inject, PLATFORM_ID, signal, viewChild, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatButtonModule,
    MatSidenavModule, 
    MatListModule, 
    HeaderComponent, 
    SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  readonly sidenav = viewChild<MatSidenav>('sidenav');
  
  private _isOpen = signal(true);
  private _isSidebarCollapsed = signal(false);
  private _isLoading = signal(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this._isSidebarCollapsed.set(width < 1200);
      this._isOpen.set(width >= 1200);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        this._isLoading.set(false);
    }
  }

  readonly isLoading = computed(() => this._isLoading());

  readonly isSidebarCollapsed = computed(() => {
    if (!isPlatformBrowser(this.platformId)) return false;
    return this._isSidebarCollapsed();
  });

  readonly isOpen = computed(() => {
    if (!isPlatformBrowser(this.platformId)) return true;
    return this._isOpen();
  });

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    if (isPlatformBrowser(this.platformId)) {
      const width = event.target.innerWidth;
      this._isSidebarCollapsed.set(width < 1200);
      this._isOpen.set(width >= 1200);
    }
  }

  toggleSidebar(): void {
    this._isOpen.update(state => !state);
  }

  onSidenavClosed() {
    this._isOpen.set(false);
  }
}