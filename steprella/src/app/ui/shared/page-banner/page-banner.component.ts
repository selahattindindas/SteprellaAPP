import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-banner',
  imports: [CommonModule, NgOptimizedImage],
  standalone: true,
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageBannerComponent {
  readonly title = input.required<string>();
}
