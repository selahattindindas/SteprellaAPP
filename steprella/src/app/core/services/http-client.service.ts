import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly http = inject(HttpClient);

  private buildUrl(requestParams: Partial<RequestParameters>): string {
    if (requestParams.fullEndPoint) {
      return requestParams.fullEndPoint;
    }
    const baseUrl = requestParams.baseUrl || this.BASE_URL;
    const controller = `/${requestParams.controller}`;
    const action = requestParams.action ? `/${requestParams.action}` : '';
    const queryString = requestParams.queryString ? `?${requestParams.queryString}` : '';
    return `${baseUrl}${controller}${action}${queryString}`;
  }

  get<T>(requestParams: Partial<RequestParameters>, id?: number | string): Observable<T> {
    const url = id ? `${this.buildUrl(requestParams)}/${id}` : this.buildUrl(requestParams);
    return this.http.get<T>(url, {
      headers: requestParams.headers,
      responseType: (requestParams.responseType as 'json') || 'json',
    });
  }

  post<T>(requestParams: Partial<RequestParameters>, body: T): Observable<T> {
    const url = this.buildUrl(requestParams);
    return this.http.post<T>(url, body, {
      headers: requestParams.headers,
      responseType: (requestParams.responseType as 'json') || 'json',
    });
  }

  put<T>(requestParams: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    const url = this.buildUrl(requestParams);
    return this.http.put<T>(url, body, {
      headers: requestParams.headers,
      responseType: (requestParams.responseType as 'json') || 'json',
    });
  }

  delete<T>(requestParams: Partial<RequestParameters>, id: number | string): Observable<T> {
    const url = `${this.buildUrl(requestParams)}/${id}`;
    return this.http.delete<T>(url, {
      headers: requestParams.headers,
      responseType: (requestParams.responseType as 'json') || 'json',
    });
  }
}

export class RequestParameters {
    controller?: string;
    action?: string;
    queryString?: string;
    headers?: HttpHeaders;
    baseUrl?: string;
    fullEndPoint?: string;
    responseType?: string = 'json';
  }
  