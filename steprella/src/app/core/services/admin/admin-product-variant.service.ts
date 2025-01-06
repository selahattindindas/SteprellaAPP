import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { Observable, map, firstValueFrom } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { CreateProductVariant } from '../../models/product-variants/create-product-variant';
import { ListProductVariant } from '../../models/product-variants/list-product-variant';
import { UpdateProductVariant } from '../../models/product-variants/update-product-variant';

@Injectable({
  providedIn: 'root'
})
export class AdminProductVariantService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListProductVariant[]> {
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "admin-product-variants",
      action: "get-all"
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }

  async create(body: CreateProductVariant, successCallBack: () => void): Promise<CreateProductVariant> {
    const observable = this.httpClientService.post<CreateProductVariant>({
      controller: "admin-product-variants",
      action: "create-product-variant"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async update(body: UpdateProductVariant, successCallBack: () => void): Promise<UpdateProductVariant> {
    const observable = this.httpClientService.put<UpdateProductVariant>({
      controller: "admin-product-variants",
      action: "update-product-variant"
    }, body);

    return firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async delete(id: number, successCallBack: () => void): Promise<ListProductVariant> {
    const observable = this.httpClientService.delete<BaseResponse<ListProductVariant>>({
      controller: "admin-product-variants"
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
