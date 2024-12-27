import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { ListUser } from '../../models/users/list-user';
import { BaseResponse } from '../../models/base-responses/base-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly httpClientService = inject(HttpClientService);

  getAll():Observable<ListUser[]>{
    return this.httpClientService.get<BaseResponse<ListUser[]>>({
      controller: 'users',
      action: 'get-all'
    }).pipe(
      map(response => response.data),
      catchError(()=> of([]))
    )
  }

  getById(id:number): Observable<ListUser | null>{
    return this.httpClientService.get<BaseResponse<ListUser>>({
      controller: 'users'
    }, id).pipe(
      map(response => response.data),
      catchError(()=> of(null))
    )
  }
}
