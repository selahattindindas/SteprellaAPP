import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { FilterGroupComponent } from '../../../shared/filter-sidebar/filter-group/filter-group.component';
import { ActivatedRoute } from '@angular/router';
import { ProductVariantService } from '../../../../core/services/ui/product-variant.service';
import { ListProductVariant } from '../../../../core/models/product-variants/list-product-variant';
import { UrlService } from '../../../../core/services/common/url.service';

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
  private productService = inject(ProductVariantService);
  private urlService = inject(UrlService);

  readonly products = signal<ListProductVariant[]>([]);
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
    this.fetchProducts(filters);
  }

  handlePageChange(page: number) {
    this.currentPage.set(page);
    const filters = this.urlService.parseQueryParams(this.route.snapshot.queryParams);
    this.fetchProducts(filters);
  }

  private fetchProducts(filters: FilterParams) {
    this.loading.set(true);
    this.productService.filter(
      filters.brandId?.[0],
      filters.colorId?.[0],
      filters.categoryId,
      filters.sizeValue?.[0],
      filters.minPrice,
      filters.maxPrice,
      filters.materialId?.[0],
      filters.usageAreaId?.[0],
      filters.genderId,
      this.currentPage() - 1,
      this.pageSize()
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
    const filters = { categoryId: this.route.snapshot.queryParams['categoryId'] };
    this.fetchProducts(filters as FilterParams);
  }
}