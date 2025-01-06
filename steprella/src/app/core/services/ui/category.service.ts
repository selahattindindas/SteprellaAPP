import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListCategory } from '../../models/categories/list-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListCategory[]> {
    return this.httpClientService.get<BaseResponse<ListCategory[]>>({
      controller: "categories",
      action: "get-all"
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }

  getById(id: number): Observable<ListCategory> {
    return this.httpClientService.get<BaseResponse<ListCategory>>({
      controller: "categories"
    }, id).pipe(
      map(response => response.data || null)
    );
  }
}
