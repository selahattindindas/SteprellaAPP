import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProductVariant } from '../../models/product-variants/list-product-variant';
import { CreateProductVariant } from '../../models/product-variants/create-product-variant';
import { UpdateProductVariant } from '../../models/product-variants/update-product-variant';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListProductVariant[]> {
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "get-all"
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }

  getById(id: number): Observable<ListProductVariant> {
    return this.httpClientService.get<BaseResponse<ListProductVariant>>({
      controller: "product-variants"
    }, id).pipe(
      map(response => response.data || null)
    );
  }

  getByProductId(productId: number): Observable<ListProductVariant[]> {
    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "by-product-id"
    }, productId).pipe(
      map(response => {
        return response.data && response.data.length > 0 ? response.data : [];
      }),
      catchError(() => {
        return of([]); 
      })
    );
  }

  search(searchTerm: string, page?: number, size?: number): Observable<ListProductVariant[]> {
    let queryString = `searchTerm=${searchTerm}`;

    if (page !== undefined && size !== undefined) {
      queryString += `&page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "search",
      queryString: queryString
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }

  fiter(brandId?: number, colorId?: number, categoryId?: number, sizeValue?: number, page?: number, size?: number): Observable<ListProductVariant[]> {

    let queryParams = Object.entries({ brandId, colorId, categoryId, sizeValue })
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    if (page !== undefined && size !== undefined) {
      queryParams += queryParams ? `&page=${page}&size=${size}` : `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListProductVariant[]>>({
      controller: "product-variants",
      action: "filter",
      queryString: queryParams ? `?${queryParams}` : ''
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }

  async create(body: CreateProductVariant, successCallBack: () => void): Promise<CreateProductVariant> {
    const observable = this.httpClientService.post<CreateProductVariant>({
      controller: "product-variants",
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
      controller: "product-variants",
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
      controller: "product-variants"
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
