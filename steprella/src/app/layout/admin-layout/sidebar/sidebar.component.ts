import { Component, input, output, signal, viewChild, type ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Menu{
  label: string;
  item: MenuItem[];
}

interface MenuItem{
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly isCollapsed = input<boolean>();
  readonly isOpen = input<boolean>();
  readonly sidebarToggled = output<void>();
  
  private readonly sidenavRef = viewChild<ElementRef>('sidenav');

  readonly menu: Menu[] = [
    {
      label: 'Uygulamalar',
      item: [
        {
          icon: 'fas fa-box',
          label: 'Ürünler',
          route: '/admin/products',
        },
        {
          icon: 'fas fa-user',
          label: 'Kullanıcılar',
          route: '/admin/users'
        },
        {
          icon: 'fas fa-tags',
          label: 'Markalar',
          route: '/admin/brand'
        }
      ]
    },
    {
      label: 'Raporlar',
      item: [
        {
          icon: 'fas fa-chart-line',
          label: 'Satış Analizi',
        },
        {
          icon: 'fas fa-chart-pie',
          label: 'Müşteri Raporları',
        },
        {
          icon: 'fas fa-chart-bar',
          label: 'Stok Durumu',
        }
      ]
    },
    {
      label: 'Ayarlar',
      item: [
        {
          icon: 'fas fa-cog',
          label: 'Genel Ayarlar',
        },
        {
          icon: 'fas fa-bell',
          label: 'Bildirim Ayarları',
        },
        {
          icon: 'fas fa-shield-alt',
          label: 'Güvenlik',
        }
      ]
    },
    
  ];

  closeSidebar(): void {
    if (this.sidenavRef()) {
      this.sidebarToggled.emit();
    }
  }
}