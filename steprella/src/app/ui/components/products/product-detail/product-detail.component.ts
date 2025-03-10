import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { RandomProductsComponent } from "../random-products/random-products.component";
import { VariantColorComponent } from "../../../pages/product-detail/variant-color/variant-color.component";
import { CommentComponent } from "../../../pages/product-detail/comment/comment.component";
import { DescriptionComponent } from "../../../pages/product-detail/description/description.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ListProduct } from "../../../../core/models/products/list-product";
import { ProductService } from "../../../../core/services/ui/product.service";
import { VariantSizeComponent } from "../../../pages/product-detail/variant-size/variant-size.component";
import { VariantBannerComponent } from "../../../pages/product-detail/variant-banner/variant-banner.component";
import { QuantitySelectorComponent } from "../../../pages/product-detail/quantity-selector/quantity-selector.component";
import { ProductHeaderComponent } from "../../../pages/product-detail/product-header/product-header.component";
import { CartItemService } from "../../../../core/services/ui/cart-item.service";
import { CreateCartItem } from "../../../../core/models/cart-items/create-cart-item";
import { Icon, SweetAlertService } from "../../../../core/services/common/sweet-alert.service";
import { AuthService } from "../../../../core/services/common/auth.service";
import { CartService } from "../../../../core/services/ui/cart.service";
import { ListProductVariant } from "../../../../core/models/product-variants/list-product-variant";
import { FavoriteService } from "../../../../core/services/ui/favorite.service";

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
  private readonly cartItemService = inject(CartItemService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly authService = inject(AuthService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly router = inject(Router);
  
  readonly product = signal<ListProduct | null>(null);
  readonly selectedVariantId = signal<number | null>(null);

  protected readonly productDetails: ProductDetail[] = [
    { title: 'Açıklama', icon: 'fa-arrow-right' },
    { title: 'Beden ve Uyumluluk', icon: 'fa-arrow-right' },
    { title: 'Ücretsiz Kargo', icon: 'fa-arrow-right' },
    { title: 'Ücretsiz İade', icon: 'fa-arrow-right' }
  ];

  selectedSizeId: number | null = null;
  selectedQuantity: number = 1;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['variantId']) {
        this.loadProduct(Number(params['id']));
        this.selectedVariantId.set(Number(params['variantId']));
      }
    });
  }

  onCommentAdded() {
    if (this.product()) {
      this.loadProduct(this.product()!.id);
    }
  }

  loadProduct(id: number) {
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.cartService.notifyCartUpdate();
      },
      error: (error) => {
        this.product.set(null);
      }
    });
  }

  onQuantityChange(quantity: number) {
    this.selectedQuantity = quantity;
  }

  onSizeSelected(sizeId: number) {
    this.selectedSizeId = sizeId;
  }

  createCartItem() {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['/auth']);
      return;
    }

    if (!this.selectedVariantId() || !this.selectedSizeId) {
      this.sweetAlertService.showMessage("Lütfen bir varyant ve beden seçiniz.", Icon.WARNING);
      return;
    }

    const cartItem: CreateCartItem = {
      productVariantId: this.selectedVariantId(),
      productVariantSizeId: this.selectedSizeId,
      quantity: this.selectedQuantity,
    };

    this.cartItemService.create(cartItem).subscribe({
      next: () => {
        this.sweetAlertService.showMessage();
        this.cartService.notifyCartUpdate();
        this.cartService.setCartOpen(true);
      },
      error: () => {
        this.sweetAlertService.showMessage("Bir hata oluştu", Icon.ERROR);
      }
    });
  }

  onFavoriteClick() {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['/auth']);
      return;
    }

    const variant = this.getSelectedVariant();
    if (!variant || variant.favorite) return;

    this.favoriteService.create({ productVariantId: variant.id }).subscribe({
      next: () => {
        variant.favorite = true;
        this.sweetAlertService.showMessage('Ürün favorilere eklendi', Icon.SUCCESS);
      },
      error: () => {
        this.sweetAlertService.showMessage('Bir hata oluştu', Icon.ERROR);
      }
    });
  }

  getSelectedVariant(): ListProductVariant | null {
    const variant = this.product()?.productVariants.find(v => v.id === this.selectedVariantId());
    return variant || null;
  }
}