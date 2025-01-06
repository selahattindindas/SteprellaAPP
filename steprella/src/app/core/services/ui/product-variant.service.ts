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

  getById(id: number): Observable<ListProductVariant> {
    return this.httpClientService.get<BaseResponse<ListProductVariant>>({
      controller: "product-variants"
    }, id).pipe(
      map(response => response.data || null)
    );
  }

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

  search(searchTerm: string, page?: number, size?: number): Observable<ListProductVariant[]> {
    let queryString = `searchTerm=${searchTerm}`;

    if (page !== undefined && size !== undefined) {
      queryString += `&page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "search",
      queryString: queryString
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }

  fiter(brandId?: number, colorId?: number, categoryId?: number, sizeValue?: number, page?: number, size?: number): Observable<ListProductVariant[]> {

    let queryParams = Object.entries({ brandId, colorId, categoryId, sizeValue })
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    if (page !== undefined && size !== undefined) {
      queryParams += queryParams ? `&page=${page}&size=${size}` : `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "filter",
      queryString: queryParams ? `?${queryParams}` : ''
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }
}
