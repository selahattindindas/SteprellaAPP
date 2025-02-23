import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ListFeature } from '../../../../core/models/features/list-feature';
import { AdminFeatureService } from '../../../../core/services/admin/admin-feature.service';
import { DialogService } from '../../../../core/services/common/dialog.service';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { FeatureService } from '../../../../core/services/ui/feature.service';
import { CreateFeatureComponent } from '../create-feature/create-feature.component';
import { UpdateFeatureComponent } from '../update-feature/update-feature.component';

@Component({
  selector: 'app-list-feature',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    UpdateFeatureComponent
  ],
  templateUrl: './list-feature.component.html',
  styleUrl: './list-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFeatureComponent {
  private readonly featureService = inject(FeatureService);
  private readonly adminFeatureService = inject(AdminFeatureService);
  private readonly dialogService = inject(DialogService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly sort = viewChild<MatSort>(MatSort);
  readonly UpdateFeatureComponent = viewChild<UpdateFeatureComponent>(UpdateFeatureComponent);

  readonly dataSource = signal<MatTableDataSource<ListFeature>>(new MatTableDataSource());
  readonly editingFeatureId = signal<number | null>(null);

  readonly displayedColumns = ['id', 'name', 'options'] as const;

  constructor() {
    effect(() => {
      this.loadFeatures();
    });
  }

  loadFeatures(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;

    this.featureService.getAll(pageIndex, pageSize).subscribe({
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
        this.adminFeatureService.delete(id,
          () => {
            this.sweetAlertService.showMessage();
            this.loadFeatures();
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
    this.editingFeatureId.update(current => current === rowId ? null : rowId);
  }

  submitUpdate(): void {
    this.UpdateFeatureComponent()?.onSubmit();
  }

  createFeatureDialog(): void {
    this.dialogService.openDialog({
      componentType: CreateFeatureComponent,
      afterClosed: () => this.loadFeatures(),
      options: {
        width: '280px',
        height: '285px'
      },
    });
  }
}
