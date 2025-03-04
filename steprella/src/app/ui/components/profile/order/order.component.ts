import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderFilterComponent } from '../../../pages/profile/order/order-filter/order-filter.component';
import { CommonModule} from '@angular/common';
import { ListOrder } from '../../../../core/models/orders/list-order';
import { OrderHeaderComponent } from "../../../pages/profile/order/order-header/order-header.component";
import { OrderItemComponent } from "../../../pages/profile/order/order-item/order-item.component";
import { OrderFooterComponent } from "../../../pages/profile/order/order-footer/order-footer.component";
import { OrderService } from '../../../../core/services/ui/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, OrderFilterComponent, OrderHeaderComponent, OrderItemComponent, OrderFooterComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  readonly listOrder = signal<ListOrder[]>([]);

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrders(0, 5).subscribe({
      next: (response) => {
        console.log(response.data);
        this.listOrder.set(response.data);
      },
    });
  }
}
