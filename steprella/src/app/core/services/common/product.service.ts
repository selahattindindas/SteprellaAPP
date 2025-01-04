import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProduct } from '../../models/products/list-product';
import { CreateProduct } from '../../models/products/create-product';
import { UpdateProduct } from '../../models/products/update-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(page: number, size: number): Observable<BaseResponse<ListProduct[]>> {

    return this.httpClientService.get<BaseResponse<ListProduct[]>>({
      controller: "products",
      action: "get-all",
      queryString: `page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
    ));
  }

  getById(id: number): Observable<ListProduct> {
    return this.httpClientService.get<BaseResponse<ListProduct>>({
      controller: "products"
    }, id).pipe(
      map(response => response.data || null)
    )
  }

  async create(body: CreateProduct, successCallBack: () => void): Promise<CreateProduct> {
    const observable = this.httpClientService.post<CreateProduct>({
      controller: "products",
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
      controller: "products",
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
      controller: "products"
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
