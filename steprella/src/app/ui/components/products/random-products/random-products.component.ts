import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { SpacingSliderComponent } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { SliderBreakpoint } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';
import { ProductService } from '../../../../core/services/ui/product.service';
import { ListProduct } from '../../../../core/models/products/list-product';

@Component({
  selector: 'app-random-products',
  imports: [SpacingSliderComponent, CardComponent, SliderHeaderComponent],
  standalone: true,
  templateUrl: './random-products.component.html',
  styleUrl: './random-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  readonly slider = viewChild<SpacingSliderComponent>('slider');

  readonly listProduct = signal<ListProduct[]>([]);

  readonly sliderBreakpoints = signal<SliderBreakpoint[]>([
    { minWidth: 1440, perView: 4, spacing: 24 },
    { maxWidth: 1200, perView: 3, spacing: 20 },
    { maxWidth: 768, perView: 2, spacing: 16 },
    { maxWidth: 480, perView: 1, spacing: 16 },
  ]);

  ngOnInit(): void {
    this.getRandomProducts();
  }

  getRandomProducts() {
    this.productService.getRandomProduct(10).subscribe({
      next: (response) => {
        this.listProduct.set(response);
      },
      error: () => {
        this.listProduct.set([]);
      }
    });
  }

  nextSlide() {
    this.slider()?.slider?.next();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
  }
}
