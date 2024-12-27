import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../core/enums/order-status-enum';

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string): string {
    const status = OrderStatus[value as keyof typeof OrderStatus];
    const statusTranslations: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: "Onay Bekliyor",
      [OrderStatus.CONFIRMED]: "Onaylandı",
      [OrderStatus.SHIPPED]: "Kargoya Verildi",
      [OrderStatus.DELIVERED]: "Teslim Edildi"
    };
    return statusTranslations[status as OrderStatus] || value;
  }
}
