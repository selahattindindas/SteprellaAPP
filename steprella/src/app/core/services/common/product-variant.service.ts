import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProductVariant } from '../../models/product-variants/list-product-variant';
import { CreateProductVariant } from '../../models/product-variants/create-product-variant';
import { UpdateProductVariant } from '../../models/product-variants/update-product-variant';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListProductVariant[]> {
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "get-all"
    }).pipe(
      map(response => response.data),
      catchError(() => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListProductVariant | null> {
    return this.httpClientService.get<BaseResponse<ListProductVariant>>({
      controller: "product-variants"
    }, id).pipe(
      map(response => response.data),
      catchError(() => {
        return of(null);
      })
    );
  }

  getByProductId(productId: number): Observable<ListProductVariant[]>{
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "by-product-id"
    }, productId).pipe(
      map(response => response.data),
      catchError(() => {
        return of([]);
      })
    );
  }

  search(searchTerm: string): Observable<ListProductVariant[]> {
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "search",
      queryString: `searchTerm=${searchTerm}`
    }).pipe(
      map(response => response.data),
      catchError(() => {
        return of([]);
      })
    )
  }

  fiter(brandId?: number, colorId?: number, categoryId?: number, sizeValue?: number): Observable<ListProductVariant[]> {
    const queryParams = Object.entries({
      brandId,
      colorId,
      categoryId,
      sizeValue
    })
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "filter",
      queryString: queryParams
    }).pipe(
      map(response => response.data),
      catchError(() => {
        return of([]);
      })
    );
  }

  create(body: CreateProductVariant, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<CreateProductVariant | null> {
    return this.httpClientService.post<CreateProductVariant>({
      controller: "product-variants",
      action: "create-product-variant"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(() => {
        return of(null);
      })
    );
  }

  update(body: UpdateProductVariant, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<UpdateProductVariant | null> {
    return this.httpClientService.put<UpdateProductVariant>({
      controller: "product-variants",
      action: "update-product-variant"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(() => {
        return of(null);
      })
    );
  }

  delete(id: number, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<ListProductVariant | null> {
    return this.httpClientService.delete<BaseResponse<ListProductVariant>>({
      controller: "product-variants"
    }, id).pipe(
      map(response => response.data),
      tap(() => successCallBack()),
      catchError(() => {
        return of(null);
      })
    );
  }
}
