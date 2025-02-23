import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ListUsageArea } from '../../../../core/models/usage-areas/list-usage-area';
import { AdminUsageAreaService } from '../../../../core/services/admin/admin-usage-area.service';
import { DialogService } from '../../../../core/services/common/dialog.service';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { UsageAreaService } from '../../../../core/services/ui/usage-area.service';
import { CreateUsageAreaComponent } from '../create-usage-area/create-usage-area.component';
import { UpdateUsageAreaComponent } from '../update-usage-area/update-usage-area.component';

@Component({
  selector: 'app-list-usage-area',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    UpdateUsageAreaComponent
  ],
  templateUrl: './list-usage-area.component.html',
  styleUrl: './list-usage-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUsageAreaComponent {
  private readonly usageAreaService = inject(UsageAreaService);
  private readonly adminUsageAreaService = inject(AdminUsageAreaService);
  private readonly dialogService = inject(DialogService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);
  readonly updateUsageAreaComponent = viewChild<UpdateUsageAreaComponent>(UpdateUsageAreaComponent);

  readonly dataSource = signal<MatTableDataSource<ListUsageArea>>(new MatTableDataSource());
  readonly editingUsageAreaId = signal<number | null>(null);

  readonly displayedColumns = ['id', 'name', 'options'] as const;

  constructor() {
    effect(() => {
      this.loadUsageAreas();
    });
  }

  loadUsageAreas(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;

    this.usageAreaService.getAll(pageIndex, pageSize).subscribe({
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
        this.adminUsageAreaService.delete(id,
          () => {
            this.sweetAlertService.showMessage();
            this.loadUsageAreas();
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
    this.editingUsageAreaId.update(current => current === rowId ? null : rowId);
  }

  submitUpdate(): void {
    this.updateUsageAreaComponent()?.onSubmit();
  }

  createUsageAreaDialog(): void {
    this.dialogService.openDialog({
      componentType: CreateUsageAreaComponent,
      afterClosed: () => this.loadUsageAreas(),
      options: {
        width: '280px',
        height: '285px'
      },
    });
  }
}
