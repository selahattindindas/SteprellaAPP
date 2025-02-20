import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListOrder } from '../../models/orders/list-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly httpClientService = inject(HttpClientService);

  getOrders(page: number, size: number): Observable<BaseResponse<ListOrder[]>> {

    return this.httpClientService.get<BaseResponse<ListOrder[]>>({
      controller: 'orders',
      action: 'get-orders',
      queryString: `page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }
}