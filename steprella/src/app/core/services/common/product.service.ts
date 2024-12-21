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

  async create(body: CreateProduct, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
    const observable: Observable<CreateProduct> = this.httpClientService.post<CreateProduct>({
      controller: "products",
      action: "create-product"
    }, body)
    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
  }

  async update(body: UpdateProduct, successCallBack: () => void, errorCallBack: (errorMessage: string) => void){
    const observable: Observable<UpdateProduct> = this.httpClientService.put<UpdateProduct>({
      controller: "products",
      action: "update-product"
    }, body)
    await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      })
      .catch(errorResponse => {
        errorCallBack(errorResponse);
      })
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
