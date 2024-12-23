import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, firstValueFrom, map, Observable, of, tap, throwError } from 'rxjs';
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
      catchError(error => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListProduct> {
    return this.httpClientService.get<BaseResponse<ListProduct>>({
      controller: "products"
    }, id).pipe(
      map(response => response.data)
    )
  }

  create(body: CreateProduct, successCallBack: () => void, errorCallBack: (errorMessage: string) => void):Observable<CreateProduct>{
    return this.httpClientService.post<CreateProduct>({
      controller: "products",
      action: "create-product"
    }, body).pipe(
      map(response => {
        successCallBack(); 
        return response;
      }),
      catchError(errorResponse => {
        errorCallBack(errorResponse);  
        return of(null as any);  
      })
    );
  }

  update(body: UpdateProduct, successCallBack: () => void, errorCallBack: (errorMessage: string) => void):Observable<CreateProduct>{
   return this.httpClientService.put<UpdateProduct>({
      controller: "products",
      action: "update-product"
    }, body).pipe(
      map(response => {
        successCallBack(); 
        return response;
      }),
      catchError(errorResponse => {
        errorCallBack(errorResponse);  
        return of(null as any);  
      })
    );
  }
  
  delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<ListProduct> {
    return this.httpClientService.delete<BaseResponse<ListProduct>>({
      controller: "products"
    }, id).pipe(
      map(response => response.data),
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    )
  }
}
