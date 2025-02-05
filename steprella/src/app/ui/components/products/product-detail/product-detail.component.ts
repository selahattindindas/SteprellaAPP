import { ChangeDetectionStrategy, Component, viewChild } from "@angular/core";
import { ThumbnailsSliderComponent } from "../../../shared/slider/thumbnails-slider/thumbnails-slider.component";
import { RandomProductsComponent } from "../random-products/random-products.component";
import { VariantColorComponent } from "../../../pages/product-detail/variant-color/variant-color.component";
import { CommentComponent } from "../../../pages/product-detail/comment/comment.component";
import { DescriptionComponent } from "../../../pages/product-detail/description/description.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ThumbnailsSliderComponent, RandomProductsComponent, VariantColorComponent, CommentComponent, DescriptionComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  readonly images = [
    { id: 1, path: 'assets/images/ui/shoe1.png' },
    { id: 2, path: 'assets/images/ui/shoe1.png' },
    { id: 3, path: 'assets/images/ui/shoe1.png' },
    { id: 4, path: 'assets/images/ui/shoe1.png' }
  ];

  quantity = 1;
  protected readonly min = 1;
  protected readonly max = 5;
}