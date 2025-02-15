import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../../../pages/profile/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { PageBannerComponent } from '../../../shared/page-banner/page-banner.component';

@Component({
  selector: 'app-profile-main',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, PageBannerComponent],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMainComponent {

}
