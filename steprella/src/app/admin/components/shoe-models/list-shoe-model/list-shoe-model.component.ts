import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateShoeModelComponent } from "../create-shoe-model/create-shoe-model.component";
import { UpdateShoeModelComponent } from "../update-shoe-model/update-shoe-model.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { firstValueFrom } from 'rxjs';
import { ListShoeModel } from '../../../../core/models/shoe-models/list-shoe-model';
import { ShoeModelService } from '../../../../core/services/common/shoe-model.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-list-shoe-model',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatDialogTitle, MatDialogContent, MatDialogActions, CreateShoeModelComponent, UpdateShoeModelComponent],
  standalone: true,
  templateUrl: './list-shoe-model.component.html',
  styleUrl: './list-shoe-model.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListShoeModelComponent implements OnInit{
  private readonly shoeModelService = inject(ShoeModelService);
  private readonly sweetAlertService = inject(SweetAlertService);
  readonly data = inject<{ brandId: number }>(MAT_DIALOG_DATA);

  @ViewChild(UpdateShoeModelComponent) updateShoeModelComponent!: UpdateShoeModelComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<ListShoeModel>;
  displayedColumns: string[] = ['id', 'name', 'options'];
  editingShoeModelId: number | null = null;

  async ngOnInit() {
    await this.getAll();
  }

  async getAll() {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 5;
    const allModel = await firstValueFrom(this.shoeModelService.getByBrandId(this.data.brandId, pageIndex, pageSize));
    this.dataSource = new MatTableDataSource(allModel.data);
    this.paginator.length = allModel.totalCount;
  }

  async delete(id: number) {
    const sweetAlertResult = await this.sweetAlertService.confirmation();
    if (sweetAlertResult.isConfirmed) {
      this.shoeModelService.delete(id,
        () => {
          this.sweetAlertService.showMessage();
          this.getAll();
        }
      )
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue;
    this.paginator?.firstPage();
  }

  editRow(rowId: number) {
    this.editingShoeModelId = this.editingShoeModelId === rowId ? null : rowId;
  }

  submitUpdate() {
    if (this.updateShoeModelComponent) {
      this.updateShoeModelComponent.onSubmit();
    }
  }
}
