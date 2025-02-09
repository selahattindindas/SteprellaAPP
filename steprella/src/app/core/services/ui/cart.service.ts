import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClientService = inject(HttpClientService);
}