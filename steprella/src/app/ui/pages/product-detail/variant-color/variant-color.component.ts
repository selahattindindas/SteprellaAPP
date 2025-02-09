import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';
import { SpacingSliderComponent } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { CommonModule } from '@angular/common';
import { ListProduct } from '../../../../core/models/products/list-product';
import { FilePipe } from '../../../../shared/pipes/file.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-variant-color',
  standalone: true,
  imports: [CommonModule, SpacingSliderComponent, SliderHeaderComponent, FilePipe],
  templateUrl: './variant-color.component.html',
  styleUrl: './variant-color.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantColorComponent {
  private readonly router = inject(Router);
  
  readonly slider = viewChild<SpacingSliderComponent>('slider');
  readonly product = input<ListProduct | null>(null);
  readonly selectedVariantId = input<number | null>(null);

  nextSlide() {
    this.slider()?.slider?.next();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
  }

  selectVariant(variantId: number) {
    const productId = this.product()?.id;
    if (productId) {
      this.router.navigate(['/product', productId, variantId]);
    }
  }
}
