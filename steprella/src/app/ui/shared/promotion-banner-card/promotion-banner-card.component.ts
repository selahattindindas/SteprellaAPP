import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-promotion-banner-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './promotion-banner-card.component.html',
  styleUrl: './promotion-banner-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionBannerCardComponent {

}
