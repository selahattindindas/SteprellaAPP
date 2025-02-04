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

  getActiveProductVariants(page?: number, size?: number): Observable<BaseResponse<ListProductVariant[]>> {
    let queryString = '';
    if (page !== undefined && size !== undefined) {
      queryString = `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: 'product-variants',
      action: 'get-active-products',
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      }))
    );
  }

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

  search(searchTerm: string, page?: number, size?: number): Observable<BaseResponse<ListProductVariant[]>> {
    let queryString = `searchTerm=${searchTerm}`;

    if (page !== undefined && size !== undefined) {
      queryString += `&page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "search",
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }

  filter(
    brandId?: number,
    colorId?: number,
    categoryId?: number,
    sizeValue?: number,
    minPrice?: number,
    maxPrice?: number,
    materialId?: number,
    usageAreaId?: number,
    featureId?: number[],
    page?: number,
    size?: number): Observable<BaseResponse<ListProductVariant[]>>{

    let queryParams = Object.entries({ brandId, colorId, categoryId, sizeValue, minPrice, maxPrice, materialId, usageAreaId, featureId })
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    if (page !== undefined && size !== undefined) {
      queryParams += queryParams ? `&page=${page}&size=${size}` : `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "filter",
      queryString: queryParams ? `${queryParams}` : ''
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }
}
