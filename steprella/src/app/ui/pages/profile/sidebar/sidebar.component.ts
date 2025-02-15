import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  id: number;
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  userEmail = signal('selomatik13161@gmail.com');

  transactionItems = signal<NavItem[]>([
    { id: 1, icon: 'local_mall', label: 'Tüm Siparişlerim', route: '/profile/orders' },
    { id: 2, icon: 'reviews', label: 'Değerlendirmelerim', route: '/profile/reviews' },
    { id: 3, icon: 'account_circle', label: 'Kullanıcı Bilgilerim', route: '/profile/info' },
    { id: 4, icon: 'place', label: 'Adreslerim', route: '/profile/addresses' }
  ]);

  specialItems = signal<NavItem[]>([
    { id: 5, icon: 'sell', label: 'İndirim Kuponlarım', route: '/profile' },
    { id: 6, icon: 'schedule', label: 'Önceden Gezilenler', route: '/profile' },
    { id: 7, icon: 'storefront', label: 'Takip Ettiğim Mağazalar', route: '/profile' }
  ]);
}
