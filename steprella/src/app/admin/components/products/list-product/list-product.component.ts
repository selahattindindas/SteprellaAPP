import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from '../../../../core/services/ui/product.service';
import { ListProduct } from '../../../../core/models/products/list-product';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListProductVariantComponent } from '../../product-variants/list-product-variant/list-product-variant.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { DialogService } from '../../../../core/services/common/dialog.service';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
    ListProductVariantComponent
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductComponent {
  private readonly productService = inject(ProductService);
  private readonly dialogService = inject(DialogService);

  readonly dataSource = signal<MatTableDataSource<ListProduct>>(new MatTableDataSource());
  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);
  readonly columnsToDisplay: string[] = [
    'id',
    'categoryName',
    'brandName',
    'shoeModelName',
    'price',
    'expand'
  ] as const;

  listProduct = signal<ListProduct | undefined>(undefined);

  constructor() {
    effect(() => {
      this.initializeDataSource();
      this.loadProducts();
    });
  }

  private initializeDataSource(): void {
    const dataSource = this.dataSource();
    dataSource.filterPredicate = this.createFilterPredicate();
    dataSource.sortingDataAccessor = this.createSortingDataAccessor();
  }
  
  loadProducts(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;
    
    this.productService.getAll(pageIndex, pageSize).subscribe({
      next: (response) => {
        this.dataSource().data = response.data;
        if (currentPaginator) {
          currentPaginator!.length = response.totalCount;

          const currentSort = this.sort();
          if (currentSort) {
            this.dataSource().sort = currentSort;
          }
        }
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource().filter = filterValue;
    this.paginator()?.firstPage();
  }

  private createFilterPredicate(): (data: ListProduct, filter: string) => boolean {
    return (data, filter) => {
      const searchStr = [
        data.category.name,
        data.brandName,
        data.shoeModelName
      ].join(' ').toLowerCase();
      
      return searchStr.includes(filter.toLowerCase());
    };
  }

  private createSortingDataAccessor(): (item: ListProduct, property: string) => string | number {
    return (item, property) => {
      switch (property) {
        case 'categoryName':
          return item.category.name;
        case 'price':
          return item.price;
        default:
          return (item as any)[property];
      }
    };
  }

  createProductDialog(): void {
    this.dialogService.openDialog({
      componentType: CreateProductComponent,
      afterClosed: () => this.loadProducts(),
      options: {
        width: '800px',
        height: '600px'
      },
    });
  }

  updateProductDialog(id: number): void {
    this.dialogService.openDialog({
      componentType: UpdateProductComponent,
      data: { id },
      afterClosed: () => this.loadProducts(),
      options: {
        width: '800px',
        height: '600px'
      },
    });
  }
}