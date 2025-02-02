import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  private readonly http = inject(HttpClient);
  private readonly httpClientService = inject(HttpClientService);


  getSizes(page?: number, size?: number): Observable<BaseResponse<any[]>> {
    return this.httpClientService.get<BaseResponse<any[]>>({
      fullEndPoint: '../../../../assets/data/size.json'
    }).pipe(
      map(response => {
        if (page !== undefined && size !== undefined) {
          const startIndex = page * size;
          const endIndex = startIndex + size;
          const paginatedData = response.data.slice(startIndex, endIndex);
          
          return {
            data: paginatedData,
            totalCount: response.data.length
          };
        }

        return {
          data: response.data,
          totalCount: response.data.length
        };
      })
    );
  }


  getGenders(page?: number, size?: number): Observable<BaseResponse<any[]>> {
    return this.httpClientService.get<BaseResponse<any[]>>({
      fullEndPoint: '../../../../assets/data/gender.json'
    }).pipe(
      map(response => {
        if (page !== undefined && size !== undefined) {
          const startIndex = page * size;
          const endIndex = startIndex + size;
          const paginatedData = response.data.slice(startIndex, endIndex);
          
          return {
            data: paginatedData,
            totalCount: response.data.length
          };
        }

        return {
          data: response.data,
          totalCount: response.data.length
        };
      })
    );
  }

}