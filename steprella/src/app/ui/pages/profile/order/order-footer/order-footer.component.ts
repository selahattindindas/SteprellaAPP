import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListOrder } from '../../../../../core/models/orders/list-order';

@Component({
  selector: 'app-order-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-footer.component.html',
  styleUrl: './order-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFooterComponent {
  readonly order = input.required<ListOrder>();
}
