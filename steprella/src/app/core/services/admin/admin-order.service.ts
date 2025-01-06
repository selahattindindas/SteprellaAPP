import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom } from 'rxjs';
import { UpdateOrder } from '../../models/orders/update-order';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private readonly httpClientService = inject(HttpClientService);

  async update(body: UpdateOrder, successCallBack: () => void): Promise<UpdateOrder> {
    const observable = this.httpClientService.put<UpdateOrder>({
      controller: "admin-orders",
      action: "update-order"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }
}
