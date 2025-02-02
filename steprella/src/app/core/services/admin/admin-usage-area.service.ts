import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { CreateUsageArea } from '../../models/usage-areas/create-usage-area';
import { UpdateUsageArea } from '../../models/usage-areas/update-usage-area';
import { ListUsageArea } from '../../models/usage-areas/list-usage-area';

@Injectable({
  providedIn: 'root'
})
export class AdminUsageAreaService {
  private readonly httpClientService = inject(HttpClientService);

    async create(body: CreateUsageArea, successCallBack: () => void): Promise<CreateUsageArea> {
      const observable = this.httpClientService.post({
        controller: "admin-usage-areas",
        action: "create-usage-area"
      }, body);
  
      return await firstValueFrom(observable)
        .then(response => {
          successCallBack();
          return response;
        });
    }
  
    async update(body: UpdateUsageArea, successCallBack: () => void): Promise<UpdateUsageArea> {
      const observable = this.httpClientService.put<UpdateUsageArea>({
        controller: "admin-usage-areas",
        action: "update-usage-area"
      }, body);
  
      return await firstValueFrom(observable)
        .then(response => {
          successCallBack();
          return response;
        });
    }
  
    async delete(id: number, successCallBack: () => void): Promise<ListUsageArea> {
      const observable = this.httpClientService.delete<BaseResponse<ListUsageArea>>({
        controller: "admin-usage-areas"
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
