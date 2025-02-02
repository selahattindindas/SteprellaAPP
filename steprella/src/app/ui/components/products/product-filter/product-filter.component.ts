import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { FilterGroupComponent } from '../../../shared/filter-sidebar/filter-group/filter-group.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router);
  private productService = inject(ProductVariantService);
  private urlService = inject(UrlService);

  readonly products = signal<ListProductVariant[]>([]);
  readonly loading = signal(false);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters = this.urlService.parseQueryParams(params);
      this.applyFilters(filters);
    });
  }

  handleFilters(filters: FilterParams) {
    const queryParams = this.urlService.createFilterQueryParams(filters);
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    }).then(() => {
      this.applyFilters(filters);
    });
  }

  private applyFilters(filters: FilterParams) {
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
      0,
      20
    ).subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Filtreleme hatası:', error);
        this.products.set([]);
        this.loading.set(false);
      }
    });
  }

  clearFilters() {
    const categoryId = this.route.snapshot.queryParams['categoryId'];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoryId }
    });
  }
}