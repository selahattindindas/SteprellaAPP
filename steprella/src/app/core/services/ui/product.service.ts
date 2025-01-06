import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProduct } from '../../models/products/list-product';

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
      map(response => response.data)
    );
  }
}
