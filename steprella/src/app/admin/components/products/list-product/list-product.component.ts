import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from '../../../../core/services/common/product.service';
import { ListProduct } from '../../../../core/models/products/list-product';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListProductVariantComponent } from '../../product-variants/list-product-variant/list-product-variant.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogService } from '../../../../core/services/dialog.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { firstValueFrom } from 'rxjs';

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
export class ListProductComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly dialogService = inject(DialogService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listProduct: ListProduct | undefined;
  dataSource!: MatTableDataSource<ListProduct>;
  columnsToDisplay = [
    'id',
    'categoryName',
    'brandName',
    'shoeModelName',
    'price',
    'expand'
  ];

  async ngOnInit(): Promise<void> {
    await this.getAll();
    this.initializeDataSource();
  }

  private initializeDataSource(): void {
    this.dataSource.filterPredicate = this.createFilterPredicate();
    this.dataSource.sortingDataAccessor = this.createSortingDataAccessor();
  }
  
  async getAll(): Promise<void> {
    const pageIndex = this.paginator?.pageIndex ?? 0;
    const pageSize = this.paginator?.pageSize ?? 5;
    
    const allProduct = await firstValueFrom(this.productService.getAll(pageIndex, pageSize));
    
    this.dataSource = new MatTableDataSource(allProduct.data);
    this.paginator.length = allProduct.totalCount;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue;
    this.paginator?.firstPage();
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
      afterClosed: () => console.log('Dialog Açıldı'),
      options: {
        width: '700px',
        height: '400px'
      },
    });
  }

  updateProductDialog(id: number): void {
    this.dialogService.openDialog({
      componentType: UpdateProductComponent,
      data: { id },
      afterClosed: () => console.log('Dialog Açıldı'),
      options: {
        width: '700px',
        height: '400px'
      },
    });
  }
}