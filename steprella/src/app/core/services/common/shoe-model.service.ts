import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListShoeModel } from '../../models/shoe-models/list-shoe-model';
import { CreateShoeModel } from '../../models/shoe-models/create-shoe-model';
import { UpdateShoeModel } from '../../models/shoe-models/update-shoe-model';

@Injectable({
  providedIn: 'root'
})
export class ShoeModelService {
  private readonly httpClientService = inject(HttpClientService);
  
  getAll(page?: number, size?:number): Observable<BaseResponse<ListShoeModel[]>> {
    let queryString = '';

    if (page !== undefined && size !== undefined) {
      queryString = `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListShoeModel[]>>({
      controller: "shoe-models",
      action: "get-all",
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
    ));
  }

  getById(id: number): Observable<ListShoeModel> {
    return this.httpClientService.get<BaseResponse<ListShoeModel>>({
      controller: "shoe-models"
    }, id).pipe(
      map(response => response.data || null)
    )
  }

  getByBrandId(brandId: number, page?: number, size?: number): Observable<BaseResponse<ListShoeModel[]>> {
    let queryString = '';

    if (page !== undefined && size !== undefined) {
      queryString = `page=${page}&size=${size}`;
    }

    return this.httpClientService.get<BaseResponse<ListShoeModel[]>>({
      controller: "shoe-models",
      action: `by-brand-id/${brandId}`,
      queryString: queryString
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        data: response.data.length > 0 ? response.data : []
      })
    ));
  }

  async create(body: CreateShoeModel, successCallBack: () => void): Promise<CreateShoeModel> {
    const observable = this.httpClientService.post<CreateShoeModel>({
      controller: "shoe-models",
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
      controller: "shoe-models",
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
      controller: "shoe-models"
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
