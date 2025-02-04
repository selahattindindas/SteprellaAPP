import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { SpacingSliderComponent } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { SliderBreakpoint } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';
import { ListProductVariant } from '../../../../core/models/product-variants/list-product-variant';
import { ProductVariantService } from '../../../../core/services/ui/product-variant.service';

@Component({
  selector: 'app-random-products',
  imports: [SpacingSliderComponent, CardComponent, SliderHeaderComponent],
  standalone: true,
  templateUrl: './random-products.component.html',
  styleUrl: './random-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomProductsComponent implements OnInit{
  private readonly productVariantService = inject(ProductVariantService);
  readonly slider = viewChild<SpacingSliderComponent>('slider');

  readonly listProduct= signal<ListProductVariant[]>([]); 

  readonly sliderBreakpoints = signal< SliderBreakpoint[]>([
    { minWidth: 1440, perView: 4, spacing: 24 },
    { maxWidth: 1200, perView: 3, spacing: 20 },
    { maxWidth: 768, perView: 2, spacing: 16 },
    { maxWidth: 480, perView: 1, spacing: 16 },
  ]);

  ngOnInit(): void{
      this.getRandomProducts();
  }

  getRandomProducts() {
    this.productVariantService.getActiveProductVariants().subscribe(response => {

      const shuffledProducts = this.shuffleArray([...response.data]);

      this.listProduct.set(shuffledProducts.slice(0, 10));
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextSlide() {
    this.slider()?.slider?.next();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
  }
}
