import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListShoeModel } from '../../models/shoe-models/list-shoe-model';
import { CreateShoeModel } from '../../models/shoe-models/create-shoe-model';
import { UpdateShoeModel } from '../../models/shoe-models/update-shoe-model';

@Injectable({
  providedIn: 'root'
})
export class ShoeModelService {
  private readonly httpClientService = inject(HttpClientService);
  
  getAll(): Observable<ListShoeModel[]> {
    return this.httpClientService.get<BaseResponse<ListShoeModel[]>>({
      controller: "shoe-models",
      action: "get-all"
    }).pipe(
      map(response => response.data),
      catchError(error => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListShoeModel> {
    return this.httpClientService.get<BaseResponse<ListShoeModel>>({
      controller: "shoe-models"
    }, id).pipe(
      map(response => response.data)
    )
  }

  getByBrandId(id: number): Observable<ListShoeModel[]> {
    return this.httpClientService.get<BaseResponse<ListShoeModel[]>>({
      controller: "shoe-models",
      action: "by-brand-id"
    }, id).pipe(
      map(response => response.data)
    )
  }

  create(body: CreateShoeModel, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<CreateShoeModel> {
    return this.httpClientService.post<CreateShoeModel>({
      controller: "shoe-models",
      action: "create-brand"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  update(body: UpdateShoeModel, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<UpdateShoeModel> {
    return this.httpClientService.put<UpdateShoeModel>({
      controller: "shoe-models",
      action: "update-brand"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    )
  }

  delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<ListShoeModel> {
    return this.httpClientService.delete<BaseResponse<ListShoeModel>>({
      controller: "shoe-models"
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
