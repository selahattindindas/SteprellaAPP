import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProduct } from '../../models/products/list-product';
import { FilterParams } from '../../models/filters/filter.params';

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
    filters: FilterParams,
  ): Observable<BaseResponse<ListProduct[]>> {
  
    const allParams = {
      ...filters,
      page,
      size
    };
  
    const queryParams = Object.entries(allParams)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  
    return this.httpClientService.get<BaseResponse<ListProduct[]>>({
      controller: "products",
      action: "filter",
      queryString: queryParams
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      }))
    );
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
