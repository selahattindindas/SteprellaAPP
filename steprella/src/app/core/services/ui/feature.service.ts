import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListFeature } from '../../models/features/list-feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private readonly httpClientService = inject(HttpClientService);

    getAll(page?: number, size?: number): Observable<BaseResponse<ListFeature[]>> {
      let queryString = '';
      if (page !== undefined && size !== undefined) {
        queryString = `page=${page}&size=${size}`;
      }
  
      return this.httpClientService.get<BaseResponse<ListFeature[]>>({
        controller: 'features',
        action: 'get-all',
        queryString: queryString
      }).pipe(
        map(response => ({
          totalCount: response.totalCount,
          data: response.data.length > 0 ? response.data : []
        }))
      );
    }
  
    getById(id: number): Observable<ListFeature> {
      return this.httpClientService.get<BaseResponse<ListFeature>>({
        controller: "features"
      }, id).pipe(
        map(response => response.data || null)
      );
    }
}