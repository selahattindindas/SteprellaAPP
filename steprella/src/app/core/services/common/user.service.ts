import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { map, Observable } from 'rxjs';
import { ListUser } from '../../models/users/list-user';
import { BaseResponse } from '../../models/base-responses/base-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(page: number, size:number):Observable<BaseResponse<ListUser[]>>{

    return this.httpClientService.get<BaseResponse<ListUser[]>>({
      controller: 'users',
      action: 'get-all',
      queryString: `page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
    ));
  }

  getById(id:number): Observable<ListUser>{
    return this.httpClientService.get<BaseResponse<ListUser>>({
      controller: 'users'
    }, id).pipe(
      map(response => response.data || null)
    )
  }
}
