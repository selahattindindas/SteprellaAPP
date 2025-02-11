import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/ui/product.service';
import { ListProduct } from '../../../core/models/products/list-product';
import { ResultToolbarComponent } from '../../shared/result-toolbar/result-toolbar.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

@Component({
  selector: 'app-search',
  imports: [
    CardComponent, 
    FormsModule, 
    ResultToolbarComponent,
    NotFoundComponent
  ],
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent  {
 private readonly productService = inject(ProductService);
 private readonly route = inject(ActivatedRoute);

 readonly searchText = signal<string>('');
 readonly products = signal<ListProduct[]>([]);
 readonly hasSearchedSignal = signal<boolean>(false);
 readonly currentPage = signal(1);
 readonly pageSize = signal(10);
 readonly totalCount = signal(0);
 readonly viewMode = signal<'grid' | 'list'>('grid');

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
     this.productService.search(this.searchText(), page - 1, this.pageSize()).subscribe({
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

 setViewMode(mode: 'grid' | 'list') {
   this.viewMode.set(mode);
 }
}