import { Injectable, inject } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private readonly httpClientService = inject(HttpClientService);
}