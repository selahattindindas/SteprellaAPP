import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
  isVisible = true;

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }
}
