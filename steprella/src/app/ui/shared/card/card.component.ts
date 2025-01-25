import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  readonly listProduct = input<Product[]>([]);

  addToCart(product: Product) {
    console.log('Added to cart:', product);
  }

  toggleFavorite(product: Product) {
    console.log('Toggled favorite:', product);
  }
}
