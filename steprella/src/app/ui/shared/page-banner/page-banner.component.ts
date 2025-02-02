import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-banner',
  imports: [],
  standalone: true,
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageBannerComponent {
  readonly title = input.required<string>();
}
