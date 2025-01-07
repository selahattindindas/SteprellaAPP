import { inject, Injectable } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { AuthService } from "../common/auth.service";
import { Observable, map } from "rxjs";
import { Login } from "../../models/auth/login";
import { Token } from "../../models/auth/token";
import { BaseResponse } from "../../models/base-responses/base-response";

@Injectable({
    providedIn: 'root'
})
export class AdminUserAuthService {
    private readonly httpClientService = inject(HttpClientService);
    private readonly authService = inject(AuthService);

    adminLogin(body: Login): Observable<BaseResponse<any>> {
        return this.httpClientService.post<any | Token>({
          controller: 'admin-auth',
          action: 'login',
          withCredentials: true
        }, body).pipe(
          map(response => {
            if (response && response.data) {
              this.authService.setToken(response.data.accessToken, 'accessToken');
              this.authService.setToken(response.data.refreshToken, 'refreshToken');
            }
            return response;
          })
        );
      }
}