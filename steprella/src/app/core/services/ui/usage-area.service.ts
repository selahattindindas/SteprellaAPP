import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListUsageArea } from '../../models/usage-areas/list-usage-area';

@Injectable({
  providedIn: 'root'
})
export class UsageAreaService {
  private readonly httpClientService = inject(HttpClientService);

    getAll(page?: number, size?: number): Observable<BaseResponse<ListUsageArea[]>> {
      let queryString = '';
      if (page !== undefined && size !== undefined) {
        queryString = `page=${page}&size=${size}`;
      }
  
      return this.httpClientService.get<BaseResponse<ListUsageArea[]>>({
        controller: 'usage-areas',
        action: 'get-all',
        queryString: queryString
      }).pipe(
        map(response => ({
          totalCount: response.totalCount,
          data: response.data.length > 0 ? response.data : []
        }))
      );
    }
  
    getById(id: number): Observable<ListUsageArea> {
      return this.httpClientService.get<BaseResponse<ListUsageArea>>({
        controller: "usage-areas"
      }, id).pipe(
        map(response => response.data || null)
      );
    }
}