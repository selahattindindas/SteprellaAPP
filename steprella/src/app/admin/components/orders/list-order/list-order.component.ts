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
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<ListOrder>()
  displayedColumns: string[] = ['id', 'orderNumber', 'status', 'option'];
  editingOrderId: number | null = null;

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    const data = await firstValueFrom(this.orderService.getByUserId(this.data.userId));
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
