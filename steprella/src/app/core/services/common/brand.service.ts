import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListBrand } from '../../models/brands/list-brand';
import { CreateBrand } from '../../models/brands/create-brand';
import { UpdateBrand } from '../../models/brands/update-brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListBrand[]> {
    return this.httpClientService.get<BaseResponse<ListBrand[]>>({
      controller: "brands",
      action: "get-all"
    }).pipe(
      map(response => response.data),
      catchError(error => {
        return of([]);
      })
    );
  }

  getById(id: number): Observable<ListBrand> {
    return this.httpClientService.get<BaseResponse<ListBrand>>({
      controller: "brands"
    }, id).pipe(
      map(response => response.data)
    )
  }

  create(body: CreateBrand, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<CreateBrand> {
    return this.httpClientService.post<CreateBrand>({
      controller: "brands",
      action: "create-brand"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  update(body: UpdateBrand, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<UpdateBrand> {
    return this.httpClientService.put<UpdateBrand>({
      controller: "brands",
      action: "update-brand"
    }, body).pipe(
      tap(() => successCallBack()),
      catchError(error => {
        errorCallBack(error.message);
        return throwError(() => new Error(error.message));
      })
    )
  }

  delete(id: number, successCallBack: () => void, errorCallBack: (errorMessage: string) => void): Observable<ListBrand> {
    return this.httpClientService.delete<BaseResponse<ListBrand>>({
      controller: "brands"
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
