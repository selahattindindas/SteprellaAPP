import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/common/user.service';
import { DialogService } from '../../../core/services/dialog.service';
import { ListOrderComponent } from '../orders/list-order/list-order.component';
import { ListUser } from '../../../core/models/users/list-user';
import { firstValueFrom } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit{
  private readonly userService = inject(UserService);
  private readonly dialogService = inject(DialogService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource! : MatTableDataSource<ListUser>;
  displayedColumns: string[] = ['id', 'email', 'fullName', 'phone', 'option'];

  async ngOnInit() {
    await this.getAll();
  }

  async getAll() {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 5;
    const allUser = await firstValueFrom(this.userService.getAll(pageIndex, pageSize));
    this.dataSource = new MatTableDataSource(allUser.data);
    this.paginator.length = allUser.totalCount;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue;
    this.paginator?.firstPage();
  }
  
  listOrderDialog(userId: number){
    this.dialogService.openDialog({
      componentType: ListOrderComponent,
      data: {userId: userId},
      afterClosed: () => console.log('Dialog Açıldı'),
      options: { width: '700px', height: '400px' },
    });
  }
}
