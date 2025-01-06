import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { CreateSize } from '../../models/sizes/create-size';
import { ListSize } from '../../models/sizes/list-size';
import { UpdateSize } from '../../models/sizes/update-size';

@Injectable({
  providedIn: 'root'
})
export class AdminSizeService {
  private readonly httpClientService = inject(HttpClientService);

  async create(body: CreateSize, successCallBack: () => void): Promise<CreateSize> {
    const observable = this.httpClientService.post<CreateSize>({
      controller: "admin-product-sizes",
      action: "create-product-size"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async update(body: UpdateSize, successCallBack: () => void): Promise<UpdateSize> {
    const observable = this.httpClientService.put<UpdateSize>({
      controller: "admin-product-sizes",
      action: "update-product-size"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async delete(id: number, successCallBack: () => void): Promise<ListSize> {
    const observable = this.httpClientService.delete<BaseResponse<ListSize>>({
      controller: "admin-product-sizes"
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
