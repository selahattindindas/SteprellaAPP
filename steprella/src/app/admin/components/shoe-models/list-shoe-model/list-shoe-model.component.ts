import { ChangeDetectionStrategy, Component, inject, viewChild, signal, effect } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateShoeModelComponent } from "../create-shoe-model/create-shoe-model.component";
import { UpdateShoeModelComponent } from "../update-shoe-model/update-shoe-model.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ListShoeModel } from '../../../../core/models/shoe-models/list-shoe-model';
import { ShoeModelService } from '../../../../core/services/ui/shoe-model.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminShoeModelService } from '../../../../core/services/admin/admin-shoe-model.service';

@Component({
  selector: 'app-list-shoe-model',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    CreateShoeModelComponent,
    UpdateShoeModelComponent
  ],
  standalone: true,
  templateUrl: './list-shoe-model.component.html',
  styleUrl: './list-shoe-model.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListShoeModelComponent {
  private readonly shoeModelService = inject(ShoeModelService);
  private readonly adminShoeModelService = inject(AdminShoeModelService);
  private readonly sweetAlertService = inject(SweetAlertService);
  readonly data = inject<{ brandId: number }>(MAT_DIALOG_DATA);

  readonly updateShoeModelComponent = viewChild(UpdateShoeModelComponent);
  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);

  readonly dataSource = signal<MatTableDataSource<ListShoeModel>>(new MatTableDataSource());
  readonly editingShoeModelId = signal<number | null>(null);
  readonly displayedColumns: string[] = ['id', 'name', 'options'] as const;

  constructor() {
    effect(() => {
      this.loadShoeModels();
    })
  }

  loadShoeModels(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;

    this.shoeModelService.getByBrandId(this.data.brandId, pageIndex, pageSize)
      .subscribe({
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
    this.sweetAlertService.confirmation().then((result) => {
      if (result.isConfirmed) {
        this.adminShoeModelService.delete(id, () => {
          this.sweetAlertService.showMessage();
          this.loadShoeModels();
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource().filter = filterValue;
    this.paginator()?.firstPage();
  }

  editRow(rowId: number) {
    this.editingShoeModelId.set(this.editingShoeModelId() === rowId ? null : rowId);
  }

  submitUpdate() {
    if (this.updateShoeModelComponent()) {
      this.updateShoeModelComponent()?.onSubmit();
    }
  }
}
