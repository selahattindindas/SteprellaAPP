import { CommonModule, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID, input } from '@angular/core';
import { ListOrder } from '../../../../../core/models/orders/list-order';
import localeTr from '@angular/common/locales/tr';

registerLocaleData(localeTr);

@Component({
  selector: 'app-order-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-header.component.html',
  styleUrl: './order-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: LOCALE_ID, useValue: 'tr-TR' }]
})
export class OrderHeaderComponent {
  readonly order = input.required<ListOrder>();
  
  getStatusClass(status: string): string {
    return status.toLowerCase() === 'completed' ? 'completed' : 'pending';
  }
}
