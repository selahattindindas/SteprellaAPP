import { ChangeDetectionStrategy, Component, inject, input, viewChild, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';
import { SpacingSliderComponent } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ListProduct } from '../../../../core/models/products/list-product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-variant-color',
  standalone: true,
  imports: [CommonModule, SpacingSliderComponent, SliderHeaderComponent, NgOptimizedImage],
  templateUrl: './variant-color.component.html',
  styleUrl: './variant-color.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantColorComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cd = inject(ChangeDetectorRef);
  
  readonly slider = viewChild<SpacingSliderComponent>('slider');
  readonly product = input<ListProduct | null>(null);
  readonly selectedVariantId = input<number | null>(null);
  readonly forceUpdateTrigger = signal<number>(0);

  ngOnInit() {
    setTimeout(() => {
      this.forceUpdateTrigger.set(Date.now());
      this.cd.detectChanges();
    }, 100);
  }

  selectVariant(variantId: number) {
    const productId = this.product()?.id;
    if (productId) {
      this.router.navigate(['/product', productId, variantId]);
      setTimeout(() => {
        this.forceUpdateTrigger.set(Date.now());
        this.cd.detectChanges();
      }, 100);
    }
  }

  nextSlide() {
    this.slider()?.slider?.next();
    this.cd.detectChanges();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
    this.cd.detectChanges();
  }
}
