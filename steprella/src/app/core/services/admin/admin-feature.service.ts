import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { CreateFeature } from '../../models/features/create-feature';
import { firstValueFrom, map } from 'rxjs';
import { UpdateFeature } from '../../models/features/update-feature';
import { ListFeature } from '../../models/features/list-feature';
import { BaseResponse } from '../../models/base-responses/base-response';

@Injectable({
  providedIn: 'root'
})
export class AdminFeatureService {
  private readonly httpClientService = inject(HttpClientService);

  async create(body: CreateFeature, successCallBack: () => void): Promise<CreateFeature> {
    const observable = this.httpClientService.post({
      controller: "admin-features",
      action: "create-feature"
    }, body);

    return await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async update(body: UpdateFeature, successCallBack: () => void): Promise<UpdateFeature> {
    const observable = this.httpClientService.put<UpdateFeature>({
      controller: "admin-features",
      action: "update-feature"
    }, body);

    return await firstValueFrom(observable)
      .then(response => {
        successCallBack();
        return response;
      });
  }

  async delete(id: number, successCallBack: () => void): Promise<ListFeature> {
    const observable = this.httpClientService.delete<BaseResponse<ListFeature>>({
      controller: "admin-features"
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
