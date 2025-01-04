import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OrderService } from '../../../../core/services/common/order.service';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { OrderStatus } from '../../../../core/enums/order-status-enum';
import { OrderStatusPipe } from '../../../../shared/pipes/order-status.pipe';
import { UpdateOrder } from '../../../../core/models/orders/update-order';

@Component({
  selector: 'app-update-order',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, OrderStatusPipe],
  standalone: true,
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateOrderComponent {
  private readonly orderService = inject(OrderService);
  private readonly sweetAlertService = inject(SweetAlertService);

  orderStatusList = Object.keys(OrderStatus)
    .filter((key) => isNaN(Number(key)) && key !== 'PENDING')
    .map((key) => ({ label: key, value: OrderStatus[key as keyof typeof OrderStatus] }));


  @ViewChild('orderForm') orderForm!: NgForm;
  @Input() orderId!: number;
  @Output() orderUpdated = new EventEmitter<number | null>();
  @Output() orderList = new EventEmitter<void>();

  onSubmit() {
    if (!this.orderForm.valid) return;

    const update: UpdateOrder = {
      id: this.orderId,
      status: this.orderForm.value.status
    }

    this.orderService.update(update,
      () => {
        this.sweetAlertService.showMessage();
        this.orderUpdated.emit(null);
        this.orderList.emit();
      }
    )
  }

}
