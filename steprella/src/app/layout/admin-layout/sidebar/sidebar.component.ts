import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  
  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      route: '/admin'
    },
    {
      icon: 'fas fa-box',
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
    }
  ];
}
