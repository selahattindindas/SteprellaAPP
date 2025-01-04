import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProductFile } from '../../models/files/list-product-file';
import { CreateFile } from '../../models/files/create-file';
import { ListFile } from '../../models/files/list-file';


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

  async create(body: CreateFile[], successCallBack: () => void): Promise<any> {
    const formData: FormData = new FormData();

    body.forEach(upload => {
      upload.files.forEach(file => {
        formData.append('productVariantId', upload.productVariantId.toString());
        formData.append('file', file, file.name);
      });
    });

    const queryString = body
      .map(file => `productVariantId=${file.productVariantId}`)
      .join('&');

    const observable = this.httpClientService.post<any>({
      controller: "product-files",
      queryString: queryString
    }, formData);

    return await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }


  async delete(id: number, successCallBack: () => void): Promise<ListFile> {
    const observable = this.httpClientService.delete<BaseResponse<ListFile>>({
      controller: 'product-files'
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