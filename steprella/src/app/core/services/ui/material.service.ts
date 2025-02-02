import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListMaterial } from '../../models/materials/list-material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private readonly httpClientService = inject(HttpClientService);

    getAll(page?: number, size?: number): Observable<BaseResponse<ListMaterial[]>> {
      let queryString = '';
      if (page !== undefined && size !== undefined) {
        queryString = `page=${page}&size=${size}`;
      }
  
      return this.httpClientService.get<BaseResponse<ListMaterial[]>>({
        controller: 'materials',
        action: 'get-all',
        queryString: queryString
      }).pipe(
        map(response => ({
          totalCount: response.totalCount,
          data: response.data.length > 0 ? response.data : []
        }))
      );
    }
  
    getById(id: number): Observable<ListMaterial> {
      return this.httpClientService.get<BaseResponse<ListMaterial>>({
        controller: "materials"
      }, id).pipe(
        map(response => response.data || null)
      );
    }
}