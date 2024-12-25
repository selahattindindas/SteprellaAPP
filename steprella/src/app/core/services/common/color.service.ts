import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListColor } from '../../models/colors/list-color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListColor[]> {
    return this.httpClientService.get<BaseResponse<ListColor[]>>({
      controller: "colors",
      action: "get-all"
    }).pipe(
      map(response => response.data),
      catchError(
        () => of([])
      ))
  }

  getById(id: number): Observable<ListColor | null> {
    return this.httpClientService.get<BaseResponse<ListColor>>({
      controller: "colors"
    }, id).pipe(
      map(response => response.data),
      catchError(() => {
        return of(null);
      })
    )
  }
}
