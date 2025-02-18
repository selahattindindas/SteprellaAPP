import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../../../pages/profile/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { PromotionBannerCardComponent } from "../../../shared/promotion-banner-card/promotion-banner-card.component";

@Component({
  selector: 'app-profile-main',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, PromotionBannerCardComponent],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMainComponent {

}
