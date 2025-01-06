import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { CreateShoeModel } from '../../models/shoe-models/create-shoe-model';
import { ListShoeModel } from '../../models/shoe-models/list-shoe-model';
import { UpdateShoeModel } from '../../models/shoe-models/update-shoe-model';

@Injectable({
  providedIn: 'root'
})
export class AdminShoeModelService {
  private readonly httpClientService = inject(HttpClientService);

  async create(body: CreateShoeModel, successCallBack: () => void): Promise<CreateShoeModel> {
    const observable = this.httpClientService.post<CreateShoeModel>({
      controller: "admin-shoe-models",
      action: "create-shoe-model"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async update(body: UpdateShoeModel, successCallBack: () => void): Promise<UpdateShoeModel> {
    const observable = this.httpClientService.put<UpdateShoeModel>({
      controller: "admin-shoe-models",
      action: "update-shoe-model"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async delete(id: number, successCallBack: () => void): Promise<ListShoeModel> {
    const observable = this.httpClientService.delete<BaseResponse<ListShoeModel>>({
      controller: "admin-shoe-models"
    }, id).pipe(
      map(response => response.data)
    );

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }
}
