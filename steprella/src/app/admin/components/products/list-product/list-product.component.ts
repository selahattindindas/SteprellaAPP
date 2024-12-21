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

@Component({
  selector: 'app-list-product',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule,
    MatExpansionModule, ListProductVariantComponent],
  standalone: true,
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
export class ListProductComponent implements OnInit, AfterViewInit {
  private productService = inject(ProductService);
  private dialogService = inject(DialogService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listProduct: ListProduct | undefined;
  dataSource = new MatTableDataSource<ListProduct>();
  columnsToDisplay = ['id', 'categoryName', 'brandName', 'shoeModelName', 'price', 'expand'];

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilterPredicate();
    this.dataSource.sortingDataAccessor = this.createSortingDataAccessor();
  }

  getAll() {
    this.productService.getAll().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue;
    this.paginator?.firstPage();
  }

  createFilterPredicate(): (data: ListProduct, filter: string) => boolean {
    return (data, filter) => {
      const filterLowerCase = filter.toLowerCase();
      const categoryName = data.category?.name.toLowerCase() || '';
      return (
        categoryName.includes(filterLowerCase) ||
        data.brandName.toLowerCase().includes(filterLowerCase) ||
        data.shoeModelName.toLowerCase().includes(filterLowerCase)
      );
    };
  }

  createSortingDataAccessor(): (item: ListProduct, property: string) => string {
    return (item, property) => {
      return property === 'categoryName'
        ? item.category?.name?.toLowerCase() || ''
        : (item as any)[property];
    };
  }

  createProductDialog(): void {
    this.dialogService.openDialog({
      componentType: CreateProductComponent,
      afterClosed: () => console.log('Dialog Açıldı'),
      options: { width: '500px', height: '400px' },
    });
  }

  updateProductDialog(id: number): void {
    this.dialogService.openDialog({
      componentType: UpdateProductComponent,
      data: { id: id },
      afterClosed: () => console.log('Dialog Açıldı'),
      options: { width: '500px', height: '400px' },
    });
  }
}