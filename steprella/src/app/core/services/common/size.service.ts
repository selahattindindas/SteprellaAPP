import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { ListSize } from '../../models/sizes/list-size';
import { BaseResponse } from '../../models/base-responses/base-response';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CreateSize } from '../../models/sizes/create-size';
import { UpdateSize } from '../../models/sizes/update-size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private readonly httpClientService = inject(HttpClientService);

    getByProductVariantId(productVariantId: number): Observable<ListSize[]> {
      return this.httpClientService.get<BaseResponse<ListSize[]>>({
        controller: "product-sizes",
        action: "by-product-variant-id"
      }, productVariantId).pipe(
        map(response => response.data),
        catchError(error => {
          return of([]);
        })
      );
    }
  
    getById(id: number): Observable<ListSize> {
      return this.httpClientService.get<BaseResponse<ListSize>>({
        controller: "product-sizes"
      }, id).pipe(
        map(response => response.data)
      )
    }
    
    create(body: CreateSize, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<CreateSize> {
      return this.httpClientService.post<CreateSize>({
        controller: "product-sizes",
        action: "create-product-size"
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
  
    update(body: UpdateSize, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<UpdateSize> {
      return this.httpClientService.put<UpdateSize>({
        controller: "product-sizes",
        action: "update-product-size"
      }, body).pipe(
        tap(() => successCallBack()),
        catchError(error => {
          errorCallBack(error.message);
          return throwError(() => new Error(error.message));
        })
      )
    }
  
    delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<ListSize> {
      return this.httpClientService.delete<BaseResponse<ListSize>>({
        controller: "product-sizes"
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
