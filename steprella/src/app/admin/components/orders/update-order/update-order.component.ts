import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { OrderStatus } from '../../../../core/enums/order-status-enum';
import { OrderStatusPipe } from '../../../../shared/pipes/order-status.pipe';
import { UpdateOrder } from '../../../../core/models/orders/update-order';
import { AdminOrderService } from '../../../../core/services/admin/admin-order.service';

@Component({
  selector: 'app-update-order',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    OrderStatusPipe
  ],
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateOrderComponent {
  private readonly adminOrderService = inject(AdminOrderService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly orderForm = viewChild<NgForm>('orderForm');

  readonly orderId = input.required<number>();
  readonly orderUpdated = output<number | null>();
  readonly orderList = output<void>();

  readonly updateOrder = model<UpdateOrder>({
    id: null,
    status: null
  });

  readonly orderStatusList = Object.keys(OrderStatus)
  .filter((key) => isNaN(Number(key)) && key !== 'PENDING')
  .map((key) => ({
    label: key,
    value: OrderStatus[key as keyof typeof OrderStatus]
  }));

  constructor() {
    effect(() => {
      this.updateOrder.update(current => ({
        ...current,
        id: this.orderId()
      }));
    });
  }

  onSubmit(): void {
    const form = this.orderForm();
    if (!form?.valid) return;

    const update: UpdateOrder = {
      id: this.orderId(),
      status: form.value.status
    };

    this.adminOrderService.update(update, () => {
      this.sweetAlertService.showMessage();
      this.orderUpdated.emit(null);
      this.orderList.emit();
    });
  }
}
