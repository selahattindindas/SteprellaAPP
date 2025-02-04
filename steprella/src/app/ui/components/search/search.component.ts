import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { ListProductVariant } from '../../../core/models/product-variants/list-product-variant';
import { ProductVariantService } from '../../../core/services/ui/product-variant.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CardComponent, FormsModule],
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  private readonly productVariantService = inject(ProductVariantService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly searchText = signal<string>('');
  readonly products = signal<ListProductVariant[]>([]);
  readonly hasSearchedSignal = signal<boolean>(false);
  readonly totalCount = signal<number>(0);
  readonly pageSize = signal<number>(1); // Sayfa başına ürün sayısı

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['search_text']) {
        this.searchText.set(params['search_text']);
      }
      const page = params['page'] || 1;
      this.searchProducts(+page); // Sayfa numarasını al ve arama yap
    });
  }

  hasSearched() {
    return this.hasSearchedSignal();
  }

  searchProducts(page: number = 1) {
    if (this.searchText().length > 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search_text: this.searchText(), page },
        queryParamsHandling: 'merge'
      });

      this.productVariantService.search(this.searchText(), page, this.pageSize()).subscribe({
        next: (response) => {
          this.products.set(response.data);
          this.totalCount.set(response.totalCount);
          this.hasSearchedSignal.set(true);
        },
        error: () => {
          this.products.set([]);
          this.totalCount.set(0);
          this.hasSearchedSignal.set(true);
        }
      });
    }
  }

  handlePageChange(page: number) {
    this.searchProducts(page); // Yeni sayfa numarası ile arama yap
  }
}
