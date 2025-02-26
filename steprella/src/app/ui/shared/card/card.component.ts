import { ChangeDetectionStrategy, Component, input, computed, output, inject, Signal } from '@angular/core';
import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { ListProductVariant } from '../../../core/models/product-variants/list-product-variant';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ListProduct } from '../../../core/models/products/list-product';
import { FavoriteService } from '../../../core/services/ui/favorite.service';
import { CreateFavorite } from '../../../core/models/favorites/create-favorite';
import { AuthService } from '../../../core/services/common/auth.service';
import { SweetAlertService } from '../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CardComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private favoriteService = inject(FavoriteService);
  private authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);

  readonly data = input<any[]>();
  readonly totalCount = input<number>();
  readonly currentPage = input<number>();
  readonly pageSize = input<number>();
  readonly onPageChange = output<number>();
  protected readonly Math = Math;

  readonly totalPages = computed(() => this.calculateTotalPages());
  readonly normalizedData: Signal<ListProduct[]> = computed(() => this.normalizeData());

  private calculateTotalPages(): number {
    const total = this.totalCount();
    const size = this.pageSize();
    return (!total || !size) ? 0 : Math.ceil(total / size);
  }

  private normalizeData(): ListProduct[] {
    const rawData = this.data();
    if (!rawData) return [];

    return rawData.map(item => this.transformToListProduct(item));
  }

  private transformToListProduct(item: any): ListProduct {
    if (!('variant' in item)) {
        return {
            ...item,
            productVariants: item.productVariants.map((variant: any) => ({
                ...variant,
                isFavorite: variant.favorite 
            }))
        } as ListProduct;
    }
  
    const { id, price, productVariant } = item;
    return {
        id,
        price: price || 0,
        ...productVariant,
        productVariants: [{
            id,
            ...productVariant,
            isFavorite: item.isFavorite || false 
        }]
    } as ListProduct;
  }

  getVisiblePageNumbers(): number[] {
    const current = this.currentPage() ?? 1;
    const total = this.totalPages();
    if (!current) return [];
  
    return [...new Set([
      1,
      ...Array.from({ length: 3 }, (_, i) => current - 1 + i).filter(n => n > 1 && n < total),
      ...(total > 1 ? [total] : [])
    ])].sort((a, b) => a - b);
  }

  toggleFavorite(variant: ListProductVariant): void {
    event?.stopPropagation();
  
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    
    if (!variant.isFavorite) {
      const createFavorite: CreateFavorite = {
        productVariantId: variant.id
      };
      
      this.favoriteService.create(createFavorite).subscribe({
        next: () => {
          variant.isFavorite = true;
          this.sweetAlertService.showMessage();
        },
      });
    }
  }
  
  handlePageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    }).then(() => this.onPageChange.emit(page));
  }

  getFirstActiveVariantId(product: ListProduct, currentVariant: ListProductVariant): number {
    if (currentVariant?.active) return currentVariant.id;
    return product.productVariants.find(v => v.active)?.id ?? product.productVariants[0].id;
  }
}