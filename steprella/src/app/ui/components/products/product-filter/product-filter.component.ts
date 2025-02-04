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
  
  currentPage = signal(1);
  pageSize = signal(1);  // Sayfa başına ürün sayısını 10 olarak belirledik.
  totalItems = signal(0);  // Toplam ürün sayısını takip etmek için
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filters = this.urlService.parseQueryParams(params);
      const page = params['page'] || 1;  // URL'den sayfa bilgisini al
      this.currentPage.set(page);
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

    const offset = (this.currentPage() - 1) * this.pageSize();

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
      offset,  // Sayfa numarasına göre offset
      this.pageSize()  // Sayfa başına ürün sayısı
    ).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.totalItems.set(response.totalCount);  // Toplam ürün sayısını güncelle
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
      queryParams: { categoryId },
      queryParamsHandling: 'merge'
    });
  }

  // Sayfa değiştirme fonksiyonu
  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) {
      return; // Sayfa numarası geçersizse hiçbir işlem yapma
    }
    
    this.currentPage.set(page);

    const queryParams = {
      ...this.route.snapshot.queryParams,
      page
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    }).then(() => {
      this.applyFilters(this.route.snapshot.queryParams);
    });
  }

  // Toplam sayfa sayısını hesaplama
  totalPages() {
    return Math.ceil(this.totalItems() / this.pageSize());
  }

  // Pagination için yardımcı fonksiyon
  getPageNumbers(): (number | string)[] {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const pages: (number | string)[] = [];
    
    if (totalPages <= 3) {
      // 3 veya daha az sayfa varsa hepsini göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // İlk sayfayı her zaman göster
      pages.push(1);
      
      if (currentPage <= 3) {
        // İlk grup: 1, 2, 3, ..., son
        pages.push(2, 3, '...', totalPages);
      } else if (currentPage > totalPages - 3) {
        // Son grup: 1, ..., son-2, son-1, son
        pages.push('...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Ortadaki gruplar: 1, ..., [üçlü grup], ..., son
        const groupStart = Math.floor((currentPage - 1) / 3) * 3 + 1;
        pages.push('...', groupStart, groupStart + 1, groupStart + 2, '...', totalPages);
      }
    }
    
    return pages;
  }
}