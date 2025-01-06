import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { CreateProduct } from '../../models/products/create-product';
import { ListProduct } from '../../models/products/list-product';
import { UpdateProduct } from '../../models/products/update-product';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private readonly httpClientService = inject(HttpClientService);

  async create(body: CreateProduct, successCallBack: () => void): Promise<CreateProduct> {
    const observable = this.httpClientService.post<CreateProduct>({
      controller: "admin-products",
      action: "create-product"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async update(body: UpdateProduct, successCallBack: () => void): Promise<UpdateProduct> {
    const observable = this.httpClientService.put<UpdateProduct>({
      controller: "admin-products",
      action: "update-product"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async delete(id: number, successCallBack: () => void): Promise<ListProduct> {
    const observable = this.httpClientService.delete<BaseResponse<ListProduct>>({
      controller: "admin-products"
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
