import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { ListProductVariant } from '../../../core/models/product-variants/list-product-variant';
import { ProductVariantService } from '../../../core/services/ui/product-variant.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  private readonly route = inject(ActivatedRoute);

  readonly searchText = signal<string>('');
  readonly products = signal<ListProductVariant[]>([]);
  readonly hasSearchedSignal = signal<boolean>(false);
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalCount = signal(0);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['search_text']) {
        this.searchText.set(params['search_text']);
        this.searchProducts(params['page'] || 1);
      }
    });
  }

  hasSearched() {
    return this.hasSearchedSignal();
  }

  searchProducts(page: number = 1) {
    if (this.searchText().length > 0) {
      this.productVariantService.search(this.searchText(), page - 1, this.pageSize()).subscribe({
        next: (response) => {
          this.products.set(response.data);
          this.currentPage.set(page);
          this.totalCount.set(response.totalCount);
          this.hasSearchedSignal.set(true);
        },
        error: () => {
          this.products.set([]);
          this.hasSearchedSignal.set(true);
        }
      });
    }
  }

  handlePageChange(page: number) {
    this.searchProducts(page);
  }
}