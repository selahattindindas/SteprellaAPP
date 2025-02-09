import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { RandomProductsComponent } from "../random-products/random-products.component";
import { VariantColorComponent } from "../../../pages/product-detail/variant-color/variant-color.component";
import { CommentComponent } from "../../../pages/product-detail/comment/comment.component";
import { DescriptionComponent } from "../../../pages/product-detail/description/description.component";
import { ActivatedRoute } from "@angular/router";
import { ListProduct } from "../../../../core/models/products/list-product";
import { finalize } from "rxjs";
import { ProductService } from "../../../../core/services/ui/product.service";
import { VariantSizeComponent } from "../../../pages/product-detail/variant-size/variant-size.component";
import { VariantBannerComponent } from "../../../pages/product-detail/variant-banner/variant-banner.component";
import { QuantitySelectorComponent } from "../../../pages/product-detail/quantity-selector/quantity-selector.component";
import { ProductHeaderComponent } from "../../../pages/product-detail/product-header/product-header.component";

interface ProductDetail {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RandomProductsComponent, 
    VariantColorComponent, 
    CommentComponent, 
    DescriptionComponent, 
    VariantSizeComponent, 
    VariantBannerComponent,
    QuantitySelectorComponent,
    ProductHeaderComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  
  product = signal<ListProduct | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  selectedVariantId = signal<number | null>(null);

  protected readonly productDetails: ProductDetail[] = [
    { title: 'Açıklama', icon: 'fa-arrow-right' },
    { title: 'Beden ve Uyumluluk', icon: 'fa-arrow-right' },
    { title: 'Ücretsiz Kargo', icon: 'fa-arrow-right' },
    { title: 'Ücretsiz İade', icon: 'fa-arrow-right' }
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['variantId']) {
        this.loadProduct(Number(params['id']));
        this.selectedVariantId.set(Number(params['variantId']));
      }
    });
  }

  private loadProduct(id: number) {
    this.isLoading.set(true);
    this.error.set(null);

    this.productService.getById(id).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (product) => {
        this.product.set(product);
      },
      error: (error) => {
        this.error.set(error.message);
      }
    });
  }

  getSelectedVariant() {
    return this.product()?.productVariants.find(v => v.id === this.selectedVariantId());
  }
}