import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ListMaterial } from '../../../../core/models/materials/list-material';
import { AdminMaterialService } from '../../../../core/services/admin/admin-material.service';
import { DialogService } from '../../../../core/services/common/dialog.service';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { MaterialService } from '../../../../core/services/ui/material.service';
import { CreateMaterialComponent } from '../create-material/create-material.component';
import { UpdateMaterialComponent } from '../update-material/update-material.component';

@Component({
  selector: 'app-list-material',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    UpdateMaterialComponent
  ],
  templateUrl: './list-material.component.html',
  styleUrl: './list-material.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMaterialComponent {
  private readonly materialService = inject(MaterialService);
  private readonly adminMaterialService = inject(AdminMaterialService);
  private readonly dialogService = inject(DialogService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);
  readonly updateMaterialComponent = viewChild<UpdateMaterialComponent>(UpdateMaterialComponent);

  readonly dataSource = signal<MatTableDataSource<ListMaterial>>(new MatTableDataSource());
  readonly editingMaterialId = signal<number | null>(null);

  readonly displayedColumns = ['id', 'name', 'options'] as const;

  constructor() {
    effect(() => {
      this.loadMaterials();
    });
  }

  loadMaterials(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;

    this.materialService.getAll(pageIndex, pageSize).subscribe({
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
        this.adminMaterialService.delete(id,
          () => {
            this.sweetAlertService.showMessage();
            this.loadMaterials();
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
    this.editingMaterialId.update(current => current === rowId ? null : rowId);
  }

  submitUpdate(): void {
    this.updateMaterialComponent()?.onSubmit();
  }

  createMaterialDialog(): void {
    this.dialogService.openDialog({
      componentType: CreateMaterialComponent,
      afterClosed: () => this.loadMaterials(),
      options: {
        width: '280px',
        height: '285px'
      },
    });
  }
}