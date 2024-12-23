import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProductVariant } from '../../models/product-variants/list-product-variant';
import { CreateProductVariant } from '../../models/product-variants/create-product-variant';
import { response } from 'express';
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
      catchError(error => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListProductVariant> {
    return this.httpClientService.get<BaseResponse<ListProductVariant>>({
      controller: "product-variants"
    }, id).pipe(
      map(response => response.data)
    );
  }

  getByProductId(productId: number): Observable<ListProductVariant[]>{
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "by-product-id"
    }, productId).pipe(
      map(response => response.data),
      catchError(error => {
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
      catchError(error => {
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
      map(response => response.data)
    );
  }

  create(body: CreateProductVariant, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<CreateProductVariant> {
    return this.httpClientService.post<CreateProductVariant>({
      controller: "product-variants",
      action: "create-product-variant"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  update(body: UpdateProductVariant, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<UpdateProductVariant> {
    return this.httpClientService.put<UpdateProductVariant>({
      controller: "product-variants",
      action: "update-product-variant"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<ListProductVariant> {
    return this.httpClientService.delete<BaseResponse<ListProductVariant>>({
      controller: "product-variants"
    }, id).pipe(
      map(response => response.data),
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
