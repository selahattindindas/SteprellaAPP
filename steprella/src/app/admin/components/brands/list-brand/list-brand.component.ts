import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../../../../core/services/common/brand.service';
import { ListBrand } from '../../../../core/models/brands/list-brand';
import { DialogService } from '../../../../core/services/dialog.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { CreateBrandComponent } from "../create-brand/create-brand.component";
import { MatIconModule } from '@angular/material/icon';
import { UpdateBrandComponent } from '../update-brand/update-brand.component';
import { ListShoeModelComponent } from '../../shoe-models/list-shoe-model/list-shoe-model.component';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-list-brand',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, CreateBrandComponent, UpdateBrandComponent],
  standalone: true,
  templateUrl: './list-brand.component.html',
  styleUrl: './list-brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBrandComponent implements OnInit {
  private readonly brandService = inject(BrandService);
  private readonly dialogService = inject(DialogService);
  private readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild(UpdateBrandComponent) updateBrandComponent!: UpdateBrandComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<ListBrand>()
  displayedColumns: string[] = ['id', 'name', 'options'];
  editingBrandId: number | null = null;

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    const data = await firstValueFrom(this.brandService.getAll());
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async delete(id: number) {
    const sweetAlertResult = await this.sweetAlertService.confirmation();
    if(sweetAlertResult.isConfirmed){
      await firstValueFrom(this.brandService.delete(id,
        () => {
          this.sweetAlertService.showMessage();
          this.getAll();
        },
        error => {
        }
      ))
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue;
    this.paginator?.firstPage();
  }

  editRow(rowId: number) {
    this.editingBrandId = this.editingBrandId === rowId ? null : rowId;
  }

  submitUpdate() {
    if (this.updateBrandComponent) {
      this.updateBrandComponent.onSubmit();
    }
  }

  listShoeModelDialog(brandId: number): void {
    this.dialogService.openDialog({
      componentType: ListShoeModelComponent,
      data: {brandId: brandId},
      afterClosed: () => console.log('Dialog Açıldı'),
      options: { width: '500px', height: '400px' },
    });
  }
}
