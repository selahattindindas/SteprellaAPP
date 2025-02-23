import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderService } from '../../../../core/services/ui/order.service';
import { ListOrder } from '../../../../core/models/orders/list-order';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { OrderStatusPipe } from '../../../../shared/pipes/order-status.pipe';
import { AdminOrderService } from '../../../../core/services/admin/admin-order.service';

@Component({
  selector: 'app-list-order',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    OrderStatusPipe,
    UpdateOrderComponent
  ],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.scss'
})
export class ListOrderComponent {
  private readonly adminOrderService = inject(AdminOrderService);
  readonly dialogData = inject<{ userId: number }>(MAT_DIALOG_DATA);

  readonly updateOrderComponent = viewChild(UpdateOrderComponent);
  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);

  readonly dataSource = signal<MatTableDataSource<ListOrder>>(new MatTableDataSource());
  readonly editingOrderId = signal<number | null>(null);

  readonly displayedColumns = ['id', 'orderNumber', 'status', 'option'] as const;

  constructor() {
    effect(() => {
      this.loadOrders();
    });
  }

  loadOrders(): void {
    const currentPaginator = this.paginator();
    const pageIndex = currentPaginator?.pageIndex ?? 0;
    const pageSize = currentPaginator?.pageSize ?? 5;

    this.adminOrderService.getOrdersByUserId(this.dialogData.userId, pageIndex, pageSize)
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

  editRow(rowId: number): void {
    this.editingOrderId.update(current => current === rowId ? null : rowId);
  }

  submitUpdate(): void {
    this.updateOrderComponent()?.onSubmit();
  }
}
