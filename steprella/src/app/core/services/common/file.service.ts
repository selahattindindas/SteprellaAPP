import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListProductFile } from '../../models/files/list-product-file';
import { CreateFile } from '../../models/files/create-file';
import { ListFile } from '../../models/files/list-file';


@Injectable({
    providedIn: 'root'
})
export class FileService {
    private readonly httpClientService = inject(HttpClientService);

    getByProductVariantId(productVariantId: number): Observable<ListProductFile | null> {
        return this.httpClientService.get<BaseResponse<ListProductFile>>({
            controller: "product-files",
            action: "by-product-variant-id"
        }, productVariantId).pipe(
            map(response => response.data),
            catchError(() => {
              return of(null);
            })
        );
    }

    create(body: CreateFile[], successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<any | null> {
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

      return this.httpClientService.post<any>({
        controller: "product-files",
        queryString: queryString
      }, formData).pipe(
        map(response => {
          successCallBack(); 
          return response;
        }),
        catchError(() => {
          return of(null);
        })
      );
    }

    delete(id: number, successCallBack: () => void, _errorCallBack: (errorMessage: string) => void): Observable<ListFile | null> {
      return this.httpClientService.delete<BaseResponse<ListFile>>({
        controller: 'product-files'
      }, id).pipe(
        map(response => {
          successCallBack(); 
          return response.data;
        }),
        catchError(() => {
          return of(null);
        })
      );
    }
}