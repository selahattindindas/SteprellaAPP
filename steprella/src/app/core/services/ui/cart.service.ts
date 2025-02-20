import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListCart } from '../../models/carts/list-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClientService = inject(HttpClientService);

      getCart(): Observable<ListCart> {
          return this.httpClientService.get<BaseResponse<ListCart>>({
              controller: 'carts',
              action: 'get-cart',
          }).pipe(
            map(response => response.data || null)
          );
      }
}