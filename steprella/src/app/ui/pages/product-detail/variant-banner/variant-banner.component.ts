import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ThumbnailsSliderComponent } from '../../../shared/slider/thumbnails-slider/thumbnails-slider.component';
import { FilePipe } from '../../../../shared/pipes/file.pipe';
import { ListProduct } from '../../../../core/models/products/list-product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-variant-banner',
  standalone: true,
  imports: [CommonModule, ThumbnailsSliderComponent, FilePipe],
  templateUrl: './variant-banner.component.html',
  styleUrl: './variant-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantBannerComponent {
 readonly product = input<ListProduct | null>(null);
 readonly variantId = input<number | null>(null);

 getSelectedVariantBanner() {
   return this.product()?.productVariants.find(v => v.id === this.variantId())?.productFiles || [];
 }
}
