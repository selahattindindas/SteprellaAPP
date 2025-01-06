import { ChangeDetectionStrategy, Component, effect, inject, signal, viewChild } from '@angular/core';
import { DialogService } from '../../../core/services/common/dialog.service';
import { ListOrderComponent } from '../orders/list-order/list-order.component';
import { ListUser } from '../../../core/models/users/list-user';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AdminUserService } from '../../../core/services/admin/admin-user.service';

@Component({
  selector: 'app-user',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatIconModule
  ],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  private readonly adminUserService = inject(AdminUserService);
  private readonly dialogService = inject(DialogService);

  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);

  readonly dataSource = signal<MatTableDataSource<ListUser>>(new MatTableDataSource());
  readonly displayedColumns = ['id', 'email', 'fullName', 'phone', 'option'] as const;

  constructor() {
    effect(() => {
      this.initializeDataSource();
      this.loadUsers();
    });
  }

  private initializeDataSource(): void {
    const ds = this.dataSource();
    const currentSort = this.sort();
    
    if (ds && currentSort) {
      ds.sort = currentSort;
    }
  }

  loadUsers(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;

    this.adminUserService.getAll(pageIndex, pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.update(ds => {
            ds.data = response.data;
            return ds;
          });
          
          if (currentPaginator) {
            currentPaginator.length = response.totalCount;
          }
        }
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource().filter = filterValue;
    this.paginator()?.firstPage();
  }
  
  listOrderDialog(userId: number) {
    this.dialogService.openDialog({
      componentType: ListOrderComponent,
      data: { userId },
      options: { 
        width: '700px', 
        height: '400px' 
      },
    });
  }
}
