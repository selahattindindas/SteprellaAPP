import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListOrder } from '../../models/orders/list-order';
import { UpdateOrder } from '../../models/orders/update-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly httpClientService = inject(HttpClientService);

  getByUserId(userId: number, page: number, size: number): Observable<BaseResponse<ListOrder[]>> {
    
    return this.httpClientService.get<BaseResponse<ListOrder[]>>({
        controller: 'orders',
        action: `by-user-id/${userId}`,
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
      controller: "orders",
      action: "update-order"
    }, body);
  
    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }
}