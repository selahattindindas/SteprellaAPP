import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProduct } from '../../models/products/list-product';
import { CreateProduct } from '../../models/products/create-product';
import { UpdateProduct } from '../../models/products/update-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListProduct[]> {
    return this.httpClientService.get<BaseResponse<ListProduct[]>>({
      controller: "products",
      action: "get-all"
    }).pipe(
      map(response => response.data),
      catchError(_error => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListProduct | null> {
    return this.httpClientService.get<BaseResponse<ListProduct>>({
      controller: "products"
    }, id).pipe(
      map(response => response.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  create(body: CreateProduct, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void):Observable<CreateProduct | null>{
    return this.httpClientService.post<CreateProduct>({
      controller: "products",
      action: "create-product"
    }, body).pipe(
      map(response => {
        successCallBack(); 
        return response;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  update(body: UpdateProduct, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void):Observable<CreateProduct | null>{
   return this.httpClientService.put<UpdateProduct>({
      controller: "products",
      action: "update-product"
    }, body).pipe(
      map(response => {
        successCallBack(); 
        return response;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }
  
  delete(id: number, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<ListProduct | null> {
    return this.httpClientService.delete<BaseResponse<ListProduct>>({
      controller: "products"
    }, id).pipe(
      map(response => response.data),
      tap(() => successCallBack()),
      catchError(() => {
        return of(null);
      })
    )
  }
}
