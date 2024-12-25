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
      catchError(_error => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListShoeModel | null> {
    return this.httpClientService.get<BaseResponse<ListShoeModel>>({
      controller: "shoe-models"
    }, id).pipe(
      map(response => response.data),
      catchError(() => {
        return of(null);
      })
    )
  }

  getByBrandId(id: number): Observable<ListShoeModel[]> {
    return this.httpClientService.get<BaseResponse<ListShoeModel[]>>({
      controller: "shoe-models",
      action: "by-brand-id"
    }, id).pipe(
      map(response => response.data),
      catchError(_error => {
        return of([]);
      })
    )
  }

  create(body: CreateShoeModel, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<CreateShoeModel | null> {
    return this.httpClientService.post<CreateShoeModel>({
      controller: "shoe-models",
      action: "create-shoe-model"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(() => {
        return of(null);
      })
    );
  }

  update(body: UpdateShoeModel, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<UpdateShoeModel | null> {
    return this.httpClientService.put<UpdateShoeModel>({
      controller: "shoe-models",
      action: "update-shoe-model"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(() => {
        return of(null);
      })
    );
  }

  delete(id: number, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<ListShoeModel | null> {
    return this.httpClientService.delete<BaseResponse<ListShoeModel>>({
      controller: "shoe-models"
    }, id).pipe(
      map(response => response.data),
      tap(() => successCallBack()),
      catchError(() => {
        return of(null);
      })
    )
  }
}
