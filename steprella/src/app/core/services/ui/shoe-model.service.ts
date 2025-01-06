import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListShoeModel } from '../../models/shoe-models/list-shoe-model';

@Injectable({
  providedIn: 'root'
})
export class ShoeModelService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(page?: number, size?: number): Observable<BaseResponse<ListShoeModel[]>> {
    let queryString = '';

    if (page !== undefined && size !== undefined) {
      queryString = `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListShoeModel[]>>({
      controller: "shoe-models",
      action: "get-all",
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }

  getById(id: number): Observable<ListShoeModel> {
    return this.httpClientService.get<BaseResponse<ListShoeModel>>({
      controller: "shoe-models"
    }, id).pipe(
      map(response => response.data || null)
    )
  }

  getByBrandId(brandId: number, page?: number, size?: number): Observable<BaseResponse<ListShoeModel[]>> {
    let queryString = '';

    if (page !== undefined && size !== undefined) {
      queryString = `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListShoeModel[]>>({
      controller: "shoe-models",
      action: `by-brand-id/${brandId}`,
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }
}
