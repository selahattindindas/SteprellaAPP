import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListColor } from '../../models/colors/list-color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private readonly httpClientService = inject(HttpClientService);

  getAll(): Observable<ListColor[]> {
    return this.httpClientService.get<BaseResponse<ListColor[]>>({
      controller: "colors",
      action: "get-all"
    }).pipe(
      map(response => response.data.length > 0 ? response.data : [])
    );
  }

  getById(id: number): Observable<ListColor> {
    return this.httpClientService.get<BaseResponse<ListColor>>({
      controller: "colors"
    }, id).pipe(
      map(response => response.data || null)
    );
  }
}
