import { ChangeDetectionStrategy, Component, input, computed, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductVariant } from '../../../core/models/product-variants/list-product-variant';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

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

  readonly listProduct = input<ListProductVariant[]>();
  readonly totalCount = input<number>();
  readonly currentPage = input<number>();
  readonly pageSize = input<number>();
  readonly onPageChange = output<number>();
  protected readonly Math = Math;

  readonly totalPages = computed(() => {
    const total = this.totalCount();
    const size = this.pageSize();
    
    if (total === undefined || size === undefined) {
      return 0;
    }
    
    return Math.ceil(total / size);
  });

  getVisiblePageNumbers(): number[] {
    const current = this.currentPage();
    const total = this.totalPages();
    
    if (current === undefined) {
      return [];
    }
    
    const pages: number[] = [];
    
    pages.push(1);
    
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    
    if (total > 1) {
      pages.push(total);
    }
    
    return [...new Set(pages)].sort((a, b) => a - b);
  }

  addToCart(product: ListProductVariant) {
    console.log('Added to cart:', product);
  }

  toggleFavorite(product: ListProductVariant) {
    console.log('Toggled favorite:', product);
  }

  handlePageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    }).then(() => {
      this.onPageChange.emit(page);
    });
  }
}