import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../core/enums/order-status-enum';

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string, type: 'text' | 'class' = 'text'): string {
    const status = OrderStatus[value as keyof typeof OrderStatus];
    
    if (type === 'class') {
      const statusClasses: Record<OrderStatus, string> = {
        [OrderStatus.PENDING]: "tw-bg-yellow-100 tw-text-yellow-800",
        [OrderStatus.CONFIRMED]: "tw-bg-blue-100 tw-text-blue-800",
        [OrderStatus.SHIPPED]: "tw-bg-purple-100 tw-text-purple-800",
        [OrderStatus.DELIVERED]: "tw-bg-green-100 tw-text-green-800"
      };
      return statusClasses[status as OrderStatus] || '';
    }

    const statusTranslations: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: "Onay Bekliyor",
      [OrderStatus.CONFIRMED]: "Onaylandı",
      [OrderStatus.SHIPPED]: "Kargoya Verildi",
      [OrderStatus.DELIVERED]: "Teslim Edildi"
    };
    return statusTranslations[status as OrderStatus] || value;
  }
}