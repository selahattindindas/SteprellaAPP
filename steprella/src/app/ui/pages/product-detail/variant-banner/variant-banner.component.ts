import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input } from '@angular/core';
import { ThumbnailsSliderComponent } from '../../../shared/slider/thumbnails-slider/thumbnails-slider.component';
import { ListProduct } from '../../../../core/models/products/list-product';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-variant-banner',
  standalone: true,
  imports: [CommonModule, ThumbnailsSliderComponent, NgOptimizedImage],
  templateUrl: './variant-banner.component.html',
  styleUrl: './variant-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantBannerComponent {
  readonly product = input<ListProduct | null>(null);
  readonly variantId = input<number | null>(null);
  private readonly cd = inject(ChangeDetectorRef);

  readonly images = computed(() => {
    return this.product()?.productVariants.find(v => v.id === this.variantId())?.productFiles || [];
  });

  constructor() {
    effect(() => {
      if (this.variantId()) {
        setTimeout(() => {
          this.cd.detectChanges();
        });
      }
    });
  }
}