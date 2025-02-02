import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListMaterial } from '../../models/materials/list-material';
import { UpdateMaterial } from '../../models/materials/update-material';
import { CreateMaterial } from '../../models/materials/create-material';

@Injectable({
  providedIn: 'root'
})
export class AdminMaterialService {
  private readonly httpClientService = inject(HttpClientService);

    async create(body: CreateMaterial, successCallBack: () => void): Promise<CreateMaterial> {
      const observable = this.httpClientService.post({
        controller: "admin-materials",
        action: "create-material"
      }, body);
  
      return await firstValueFrom(observable)
        .then(response => {
          successCallBack();
          return response;
        });
    }
  
    async update(body: UpdateMaterial, successCallBack: () => void): Promise<UpdateMaterial> {
      const observable = this.httpClientService.put<UpdateMaterial>({
        controller: "admin-materials",
        action: "update-material"
      }, body);
  
      return await firstValueFrom(observable)
        .then(response => {
          successCallBack();
          return response;
        });
    }
  
    async delete(id: number, successCallBack: () => void): Promise<ListMaterial> {
      const observable = this.httpClientService.delete<BaseResponse<ListMaterial>>({
        controller: "admin-materials"
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
