import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { BaseResponse } from '../../models/base-responses/base-response';
import { firstValueFrom, map } from 'rxjs';
import { CreateBrand } from '../../models/brands/create-brand';
import { ListBrand } from '../../models/brands/list-brand';
import { UpdateBrand } from '../../models/brands/update-brand';

@Injectable({
  providedIn: 'root'
})
export class AdminBrandService {
  private readonly httpClientService = inject(HttpClientService);

  async create(body: CreateBrand, successCallBack: () => void): Promise<CreateBrand> {
    const observable = this.httpClientService.post({
      controller: "admin-brands",
      action: "create-brand"
    }, body);

    return await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async update(body: UpdateBrand, successCallBack: () => void): Promise<UpdateBrand> {
    const observable = this.httpClientService.put<UpdateBrand>({
      controller: "admin-brands",
      action: "update-brand"
    }, body);

    return await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async delete(id: number, successCallBack: () => void): Promise<ListBrand> {
    const observable = this.httpClientService.delete<BaseResponse<ListBrand>>({
      controller: "admin-brands"
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
