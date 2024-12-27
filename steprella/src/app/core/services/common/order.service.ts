import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListOrder } from '../../models/orders/list-order';
import { UpdateOrder } from '../../models/orders/update-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly httpClientService = inject(HttpClientService);

  getByUserId(userId: number): Observable<ListOrder[]>{
    return this.httpClientService.get<BaseResponse<ListOrder[]>>({
        controller: 'orders',
        action: 'by-user-id'
    }, userId).pipe(
        map(response => response.data),
        catchError(()=>
        of([]))
    )
  }

    update(body: UpdateOrder, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<UpdateOrder | null> {
      return this.httpClientService.put<UpdateOrder>({
        controller: "orders",
        action: "update-order"
      }, body).pipe(
        tap(() => successCallBack()),
        catchError(() => {
          return of(null);
        })
      );
    }
}