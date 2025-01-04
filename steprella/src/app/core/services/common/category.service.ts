import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListCategory } from '../../models/categories/list-category';
import { CreateCategory } from '../../models/categories/create-category';
import { UpdateCategory } from '../../models/categories/update-category';

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

  async create(body: CreateCategory, successCallBack: () => void): Promise<CreateCategory> {
    const observable = this.httpClientService.post<CreateCategory>({
      controller: "categories",
      action: "create-category"
    }, body);
    
    return await firstValueFrom(observable)
      .then(response => {
        successCallBack(); 
        return response;
      });
  }
  
  async update(body: UpdateCategory, successCallBack: () => void): Promise<UpdateCategory> {
    const observable = this.httpClientService.put<UpdateCategory>({
      controller: "categories",
      action: "update-category"
    }, body);
    
    return await firstValueFrom(observable)
      .then(response => {
        successCallBack(); 
        return response;
      });
  }
  
  async delete(id: number, successCallBack: () => void): Promise<ListCategory> {
    const observable = this.httpClientService.delete<BaseResponse<ListCategory>>({
      controller: "categories"
    }, id).pipe(
      map(response => response.data)
    );
  
    return await firstValueFrom(observable)
      .then(response => {
        successCallBack(); 
        return response;
      });
  }
}
