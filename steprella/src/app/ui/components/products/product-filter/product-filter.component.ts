import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { FilterGroupComponent } from '../../../shared/filter-sidebar/filter-group/filter-group.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../core/services/common/url.service';
import { ProductService } from '../../../../core/services/ui/product.service';
import { ListProduct } from '../../../../core/models/products/list-product';

interface FilterParams {
  categoryId?: number;
  brandId?: number[];
  colorId?: number[];
  sizeValue?: number[];
  materialId?: number[];
  usageAreaId?: number[];
  minPrice?: number;
  maxPrice?: number;
  genderId?: number[];
}

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, CardComponent, FilterGroupComponent],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private urlService = inject(UrlService);
  private router = inject(Router);

  readonly products = signal<ListProduct[]>([]);
  readonly loading = signal(false);
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalCount = signal(0);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters = this.urlService.parseQueryParams(params);
      if (params['page']) {
        this.currentPage.set(Number(params['page']));
      }
      this.fetchProducts(filters);
    });
  }

  handleFilters(filters: FilterParams) {
    const queryParams = this.urlService.createFilterQueryParams(filters);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  handlePageChange(page: number) {
    this.currentPage.set(page);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  private fetchProducts(filters: FilterParams) {
    this.loading.set(true);
    this.productService.filter(
      this.currentPage() - 1,
      this.pageSize(),
      filters.brandId?.[0],
      filters.colorId?.[0],
      filters.categoryId,
      filters.sizeValue?.[0],
      filters.minPrice,
      filters.maxPrice,
      filters.materialId?.[0],
      filters.usageAreaId?.[0],
      filters.genderId,
    ).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.totalCount.set(response.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.products.set([]);
        this.totalCount.set(0);
        this.loading.set(false);
      }
    });
  }

  clearFilters() {
    const categoryId = this.route.snapshot.queryParams['categoryId'];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: categoryId ? { categoryId } : {}
    });
  }
}