import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { BrandService } from '../../../../core/services/ui/brand.service';
import { ListBrand } from '../../../../core/models/brands/list-brand';
import { DialogService } from '../../../../core/services/common/dialog.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateBrandComponent } from "../create-brand/create-brand.component";
import { MatIconModule } from '@angular/material/icon';
import { UpdateBrandComponent } from '../update-brand/update-brand.component';
import { ListShoeModelComponent } from '../../shoe-models/list-shoe-model/list-shoe-model.component';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminBrandService } from '../../../../core/services/admin/admin-brand.service';

@Component({
  selector: 'app-list-brand',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    UpdateBrandComponent
  ],
  templateUrl: './list-brand.component.html',
  styleUrl: './list-brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBrandComponent {
  private readonly brandService = inject(BrandService);
  private readonly adminBrandService = inject(AdminBrandService);
  private readonly dialogService = inject(DialogService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);
  readonly updateBrandComponent = viewChild<UpdateBrandComponent>(UpdateBrandComponent);

  readonly dataSource = signal<MatTableDataSource<ListBrand>>(new MatTableDataSource());
  readonly editingBrandId = signal<number | null>(null);

  readonly displayedColumns = ['id', 'name', 'options'] as const;

  constructor() {
    effect(() => {
      this.loadBrands();
    });
  }

  loadBrands(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;

    this.brandService.getAll(pageIndex, pageSize).subscribe({
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

  delete(id: number) {
    this.sweetAlertService.confirmation().then(result => {
      if (result.isConfirmed) {
        this.adminBrandService.delete(id,
          () => {
            this.sweetAlertService.showMessage();
            this.loadBrands();
          }
        )
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.update(ds => {
      ds.filter = filterValue;
      return ds;
    });
    this.paginator()?.firstPage();
  }

  editRow(rowId: number): void {
    this.editingBrandId.update(current => current === rowId ? null : rowId);
  }

  submitUpdate(): void {
    this.updateBrandComponent()?.onSubmit();
  }

  listShoeModelDialog(brandId: number): void {
    this.dialogService.openDialog({
      componentType: ListShoeModelComponent,
      data: { brandId },
      afterClosed: () => this.loadBrands(),
      options: { 
        width: '800px', 
        height: '610px' 
      },
    });
  }

  createBrandDialog(): void {
    this.dialogService.openDialog({
      componentType: CreateBrandComponent,
      afterClosed: () => this.loadBrands(),
      options: {
        width: '280px',
        height: '260px'
      },
    });
  }
}
