import { ChangeDetectionStrategy, Component, input, computed, output, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductVariant } from '../../../core/models/product-variants/list-product-variant';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ListProduct } from '../../../core/models/products/list-product';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
    if (!('productVariant' in item)) return item as ListProduct;
  
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

  addToCart(product: ListProductVariant): void {
    console.log('Added to cart:', product);
  }

  toggleFavorite(product: ListProductVariant): void {
    console.log('Toggled favorite:', product);
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