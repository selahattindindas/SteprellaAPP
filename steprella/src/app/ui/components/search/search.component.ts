import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";

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
  selector: 'app-search',
  imports: [CardComponent],
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  searchText = signal<string>('');
  listProduct = signal<Product[]>([{
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
  {
    id: 5,
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
  {
    id: 5,
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
  {
    id: 5,
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
  {
    id: 5,
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
  {
    id: 5,
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
  {
    id: 5,
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
  
  ]);

  filteredProducts = computed(() =>
    !this.searchText() ? this.listProduct() :
    this.listProduct().filter(product =>
      product.name.toLowerCase().includes(this.searchText().toLowerCase())
    )
  );

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchText.set(inputElement.value);
  }
}
