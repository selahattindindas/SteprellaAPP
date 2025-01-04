import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderService } from '../../../../core/services/common/order.service';
import { ListOrder } from '../../../../core/models/orders/list-order';
import { firstValueFrom } from 'rxjs';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { OrderStatusPipe } from '../../../../shared/pipes/order-status.pipe';

@Component({
  selector: 'app-list-order',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatDialogTitle, MatDialogContent, MatDialogActions, OrderStatusPipe, UpdateOrderComponent],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.scss'
})
export class ListOrderComponent implements OnInit{
  private readonly orderService = inject(OrderService);
  readonly data = inject<{ userId: number }>(MAT_DIALOG_DATA);

  @ViewChild(UpdateOrderComponent) updateOrderComponent!: UpdateOrderComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource! : MatTableDataSource<ListOrder>;
  displayedColumns: string[] = ['id', 'orderNumber', 'status', 'option'];
  editingOrderId: number | null = null;

  async ngOnInit(){
    await this.getAll();
  }

  async getAll() {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 5;

    const allOrder = await firstValueFrom(this.orderService.getByUserId(this.data.userId, pageIndex, pageSize));
    this.dataSource = new MatTableDataSource(allOrder.data);
    this.paginator.length = allOrder.totalCount;
  }

  editRow(rowId: number) {
    this.editingOrderId = this.editingOrderId === rowId ? null : rowId;
  }

  submitUpdate() {
    if (this.updateOrderComponent) {
      this.updateOrderComponent.onSubmit();
    }
  }
}
