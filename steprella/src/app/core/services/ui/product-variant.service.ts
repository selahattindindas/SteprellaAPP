import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProductVariant } from '../../models/product-variants/list-product-variant';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {
  private readonly httpClientService = inject(HttpClientService);

  getByProductId(productId: number): Observable<ListProductVariant[]> {
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "by-product-id"
    }, productId).pipe(
      map(response => {
        return response.data && response.data.length > 0 ? response.data : [];
      }),
      catchError(() => {
        return of([]);
      })
    );
  }
  
  getById(id: number): Observable<ListProductVariant> {
    return this.httpClientService.get<BaseResponse<ListProductVariant>>({
      controller: "product-variants"
    }, id).pipe(
      map(response => response.data || null)
    );
  }
}
