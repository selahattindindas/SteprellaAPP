import { Injectable, inject } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { CreateCartItem } from "../../models/cart-items/create-cart-item";
import { UpdateCartItem } from "../../models/cart-items/update-cart-item";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private readonly httpClientService = inject(HttpClientService);

  create(body: CreateCartItem): Observable<CreateCartItem> {
    return this.httpClientService.post<CreateCartItem>({
      controller: "cart-items",
      action: "create-cart-item"
    }, body);
  }

  update(body: UpdateCartItem): Observable<UpdateCartItem> {
    return this.httpClientService.put<UpdateCartItem>({
      controller: "cart-items",
      action: "update-cart-item"
    }, body);
  }

  delete(id: number): Observable<void> {
    return this.httpClientService.delete<void>({
      controller: "cart-items"
    }, id);
  }
}