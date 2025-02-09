import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListProduct } from '../../../../core/models/products/list-product';

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductHeaderComponent {
  readonly product = input<ListProduct | null>(null);
}
