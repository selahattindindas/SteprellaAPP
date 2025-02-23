import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { UpdateOrder } from '../../models/orders/update-order';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListOrder } from '../../models/orders/list-order';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private readonly httpClientService = inject(HttpClientService);

  getOrdersByUserId(userId: number, page: number, size: number): Observable<BaseResponse<ListOrder[]>> {
    return this.httpClientService.get<BaseResponse<ListOrder[]>>({
      controller: 'admin-orders',
      action: `users/${userId}/orders`,
      queryString: `page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }
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
