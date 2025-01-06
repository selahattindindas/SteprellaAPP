import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { CreateCategory } from '../../models/categories/create-category';
import { ListCategory } from '../../models/categories/list-category';
import { UpdateCategory } from '../../models/categories/update-category';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  private readonly httpClientService = inject(HttpClientService);

  async create(body: CreateCategory, successCallBack: () => void): Promise<CreateCategory> {
    const observable = this.httpClientService.post<CreateCategory>({
      controller: "admin-categories",
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
      controller: "admin-categories",
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
      controller: "admin-categories"
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
