import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProductFile } from '../../models/files/list-product-file';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly httpClientService = inject(HttpClientService);

  getByProductVariantId(productVariantId: number): Observable<ListProductFile> {
    return this.httpClientService.get<BaseResponse<ListProductFile>>({
      controller: "product-files",
      action: "by-product-variant-id"
    }, productVariantId).pipe(
      map(response => response.data || null)
    );
  }
}