import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListBrand } from '../../models/brands/list-brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(page?: number, size?: number): Observable<BaseResponse<ListBrand[]>> {
    let queryString = '';
    if (page !== undefined && size !== undefined) {
      queryString = `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListBrand[]>>({
      controller: 'brands',
      action: 'get-all',
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      }))
    );
  }

  getById(id: number): Observable<ListBrand> {
    return this.httpClientService.get<BaseResponse<ListBrand>>({
      controller: "brands"
    }, id).pipe(
      map(response => response.data || null)
    );
  }
}