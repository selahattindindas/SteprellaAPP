import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { SpacingSliderComponent } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { SliderBreakpoint } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  soldOutPercentage: number;
}
@Component({
  selector: 'app-random-products',
  imports: [SpacingSliderComponent, CardComponent, SliderHeaderComponent],
  standalone: true,
  templateUrl: './random-products.component.html',
  styleUrl: './random-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomProductsComponent {
  readonly slider = viewChild<SpacingSliderComponent>('slider');

  readonly listProduct: Product[] = [{
    id: 1,
    name: 'Nike Running Shoe',
    price: 349,
    rating: 5,
    reviews: 11600,
    image: 'assets/images/ui/shoe1.png',
    soldOutPercentage: 85
  },
  {
    id: 2,
    name: 'Nike Running Shoe',
    price: 349,
    rating: 5,
    reviews: 11600,
    image: 'assets/images/ui/shoe1.png',
    soldOutPercentage: 85
  },
  {
    id: 3,
    name: 'Nike Running Shoe',
    price: 349,
    rating: 5,
    reviews: 11600,
    image: 'assets/images/ui/shoe1.png',
    soldOutPercentage: 85
  },
  {
    id: 4,
    name: 'Nike Running Shoe',
    price: 349,
    rating: 5,
    reviews: 11600,
    image: 'assets/images/ui/shoe1.png',
    soldOutPercentage: 85
  },
  {
    id: 5,
    name: 'Nike Running Shoe',
    price: 349,
    rating: 5,
    reviews: 11600,
    image: 'assets/images/ui/shoe1.png',
    soldOutPercentage: 85
  },
  ];

  readonly sliderBreakpoints: SliderBreakpoint[] = [
    { minWidth: 1440, perView: 4, spacing: 24 },
    { maxWidth: 1200, perView: 3, spacing: 20 },
    { maxWidth: 768, perView: 2, spacing: 16 },
    { maxWidth: 480, perView: 1, spacing: 16 },
  ];

  nextSlide() {
    this.slider()?.slider?.next();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
  }
}
