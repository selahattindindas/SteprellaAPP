import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListBrand } from '../../models/brands/list-brand';
import { CreateBrand } from '../../models/brands/create-brand';
import { UpdateBrand } from '../../models/brands/update-brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(page?: number, size?: number): Observable<BaseResponse<ListBrand[]>> {
    let queryString = '';
    if (page !== undefined && size !== undefined) {
      queryString = `page=${page}&size=${size}`;
    }
  
    return this.httpClientService.get<BaseResponse<ListBrand[]>>({
      controller: 'brands',
      action: 'get-all',
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      }))
    );
  }

  getById(id: number): Observable<ListBrand> {
    return this.httpClientService.get<BaseResponse<ListBrand>>({
      controller: "brands"
    }, id).pipe(
      map(response => response.data || null)
    );
  }

  async create(body: CreateBrand, successCallBack: () => void): Promise<CreateBrand> {
    const observable = this.httpClientService.post({
      controller: "brands",
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
      controller: "brands",
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
      controller: "brands"
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