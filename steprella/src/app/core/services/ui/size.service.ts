import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ListSize } from '../../models/sizes/list-size';
import { BaseResponse } from '../../models/base-responses/base-response';
import { map, Observable } from 'rxjs';

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
}
