import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styles: [`
    .active-link {
      background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%) !important;
      color: white !important;
      border-radius: 6px;
      margin: 0 8px;
    }
  `]
})
export class SidebarComponent {
  readonly isCollapsed = input<boolean>();
  readonly isOpen = input<boolean>();
  readonly sidebarToggled = output<void>();

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

}