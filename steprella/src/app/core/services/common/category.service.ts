import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListCategory } from '../../models/categories/list-category';
import { CreateCategory } from '../../models/categories/create-category';
import { UpdateCategory } from '../../models/categories/update-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListCategory[]> {
    return this.httpClientService.get<BaseResponse<ListCategory[]>>({
      controller: "categories",
      action: "get-all"
    }).pipe(
      map(response => response.data),
      catchError(error => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListCategory> {
    return this.httpClientService.get<BaseResponse<ListCategory>>({
      controller: "categories"
    }, id).pipe(
      map(response => response.data)
    )
  }

  create(body: CreateCategory, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<CreateCategory> {
    return this.httpClientService.post<CreateCategory>({
      controller: "categories",
      action: "create-category"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  update(body: UpdateCategory, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<UpdateCategory> {
    return this.httpClientService.put<UpdateCategory>({
      controller: "categories",
      action: "update-category"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    )
  }

  delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<ListCategory> {
    return this.httpClientService.delete<BaseResponse<ListCategory>>({
      controller: "categories"
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
