import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { FilterGroupComponent } from '../../../shared/filter-sidebar/filter-group/filter-group.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../core/services/common/url.service';
import { ProductService } from '../../../../core/services/ui/product.service';
import { ListProduct } from '../../../../core/models/products/list-product';
import { ResultToolbarComponent } from '../../../shared/result-toolbar/result-toolbar.component';
import { NotFoundComponent } from '../../../shared/not-found/not-found.component';
import { FilterParams } from '../../../../core/models/filters/filter.params';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    FilterGroupComponent, 
    ResultToolbarComponent,
    NotFoundComponent
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit {
  @ViewChild('filterGroup') filterGroup!: FilterGroupComponent;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private urlService = inject(UrlService);
  private router = inject(Router);

  readonly products = signal<ListProduct[]>([]);
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

  fetchProducts(filters: FilterParams) {
    this.productService.filter(
      this.currentPage() - 1,
      this.pageSize(),
      filters
    ).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.totalCount.set(response.totalCount);
      },
      error: () => {
        this.products.set([]);
        this.totalCount.set(0);
      }
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

  clearFilters() {
    const categoryId = this.route.snapshot.queryParams['categoryId'];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: categoryId ? { categoryId } : {}
    });
  }

  toggleFilters(): void {
    this.filterGroup.toggleSidebar();
  }
}