import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductVariant } from '../../../core/models/product-variants/list-product-variant';
import { FilePipe } from '../../../shared/pipes/file.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FilePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  readonly listProduct = input<ListProductVariant[]>([]);

  addToCart(product: ListProductVariant) {
    console.log('Added to cart:', product);
  }

  toggleFavorite(product: ListProductVariant) {
    console.log('Toggled favorite:', product);
  }
}
