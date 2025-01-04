import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { ListSize } from '../../models/sizes/list-size';
import { BaseResponse } from '../../models/base-responses/base-response';
import { firstValueFrom, map, Observable } from 'rxjs';
import { CreateSize } from '../../models/sizes/create-size';
import { UpdateSize } from '../../models/sizes/update-size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private readonly httpClientService = inject(HttpClientService);

    getByProductVariantId(productVariantId: number): Observable<ListSize[]> {
      return this.httpClientService.get<BaseResponse<ListSize[]>>({
        controller: "product-sizes",
        action: "by-product-variant-id"
      }, productVariantId).pipe(
        map(response => response.data.length > 0 ? response.data : [])
      );
    }
  
    getById(id: number): Observable<ListSize> {
      return this.httpClientService.get<BaseResponse<ListSize>>({
        controller: "product-sizes"
      }, id).pipe(
        map(response => response.data || null)
      )
    }
    
    async create(body: CreateSize, successCallBack: () => void): Promise<CreateSize> {
      const observable = this.httpClientService.post<CreateSize>({
        controller: "product-sizes",
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
        controller: "product-sizes",
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
        controller: "product-sizes"
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
