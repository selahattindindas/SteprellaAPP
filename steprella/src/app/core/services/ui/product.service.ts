import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProduct } from '../../models/products/list-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(page: number, size: number): Observable<BaseResponse<ListProduct[]>> {
    return this.httpClientService.get<BaseResponse<ListProduct[]>>({
      controller: "products",
      action: "get-all",
      queryString: `page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }

  getRandomProduct(count:number):Observable<ListProduct[]>{
    return this.httpClientService.get<BaseResponse<ListProduct[]>>({
      controller: "products",
      action: "random-product",
      queryString: `count=${count}`
    }).pipe(
      map(response => {
        return response.data && response.data.length > 0 ? response.data : [];
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  filter(
    page: number,
    size: number,
    brandId?: number,
    colorId?: number,
    categoryId?: number,
    sizeValue?: number,
    minPrice?: number,
    maxPrice?: number,
    materialId?: number,
    usageAreaId?: number,
    featureId?: number[]
  ): Observable<BaseResponse<ListProduct[]>> {
  
    let queryParams = Object.entries({ brandId, colorId, categoryId, sizeValue, minPrice, maxPrice, materialId, usageAreaId, featureId })
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  
    queryParams += queryParams ? `&page=${page}&size=${size}` : `page=${page}&size=${size}`;
  
    return this.httpClientService.get<BaseResponse<ListProduct[]>>({
      controller: "products",
      action: "filter",
      queryString: queryParams
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }

  search(searchTerm:string, page: number, size: number,): Observable<BaseResponse<ListProduct[]>>{
    return this.httpClientService.get<BaseResponse<ListProduct[]>>({
      controller: "products",
      action: "search",
      queryString: `searchTerm=${searchTerm}&page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      }))
    );
  }

  getById(id: number): Observable<ListProduct> {
    return this.httpClientService.get<BaseResponse<ListProduct>>({
      controller: "products"
    }, id).pipe(
      map(response => response.data)
    );
  }
}
