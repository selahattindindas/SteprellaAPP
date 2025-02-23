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
  styleUrl: './sidebar.component.scss'
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
          icon: 'fas fa-boxes',
          label: 'Ürünler',
          route: '/admin/products',
        },
        {
          icon: 'fas fa-users',
          label: 'Kullanıcılar',
          route: '/admin/users'
        },
        {
          icon: 'fas fa-tags',
          label: 'Markalar',
          route: '/admin/brand'
        },
        {
          icon: 'fas fa-sliders',
          label: 'Ek Özellikler',
          route: '/admin/feature'
        },
        {
          icon: 'fas fa-cube',
          label: 'Materyal',
          route: '/admin/material'
        },
        {
          icon: 'fas fa-list-check',
          label: 'Kullanım Alanı',
          route: '/admin/usageArea'
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