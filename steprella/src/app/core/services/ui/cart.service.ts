import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListCart } from '../../models/carts/list-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClientService = inject(HttpClientService);

  private cartUpdateSubject = new BehaviorSubject<void>(undefined);
  cartUpdate$ = this.cartUpdateSubject.asObservable();

  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpenSubject.asObservable();

  notifyCartUpdate() {
    this.cartUpdateSubject.next();
  }

  setCartOpen(isOpen: boolean) {
    this.cartOpenSubject.next(isOpen);
  }

  getCart(): Observable<ListCart> {
    return this.httpClientService.get<BaseResponse<ListCart>>({
      controller: 'carts',
      action: 'get-cart',
    }).pipe(
      map(response => response.data || null)
    );
  }
}