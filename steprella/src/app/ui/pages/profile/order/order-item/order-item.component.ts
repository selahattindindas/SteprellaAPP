import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListOrderItem } from '../../../../../core/models/order-items/list-order-item';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemComponent {
  readonly orderItem = input.required<ListOrderItem[]>();
}
