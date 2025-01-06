import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListUser } from '../../models/users/list-user';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(page: number, size: number): Observable<BaseResponse<ListUser[]>> {

    return this.httpClientService.get<BaseResponse<ListUser[]>>({
      controller: 'admin-users',
      action: 'get-all',
      queryString: `page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
      ));
  }

  getById(id: number): Observable<ListUser> {
    return this.httpClientService.get<BaseResponse<ListUser>>({
      controller: 'admin-users'
    }, id).pipe(
      map(response => response.data || null)
    )
  }
}
