import { inject, Injectable } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { AuthService } from "../common/auth.service";
import { Observable, firstValueFrom } from "rxjs";
import { Login } from "../../models/auth/login";
import { Token } from "../../models/auth/token";
import { BaseResponse } from "../../models/base-responses/base-response";

@Injectable({
    providedIn: 'root'
})
export class AdminUserAuthService {
    private readonly httpClientService = inject(HttpClientService);
    private readonly authService = inject(AuthService);

    async adminLogin(body: Login, callBackFunction: () => void): Promise<void> {
        const observable: Observable<any | Token> = this.httpClientService.post({
            controller: 'admin-auth',
            action: 'login',
            withCredentials: true
        }, body);

        const response: BaseResponse<Token> = await firstValueFrom(observable);

        if (response && response.data) {
            this.authService.setToken(response.data.accessToken, 'accessToken');
            this.authService.setToken(response.data.refreshToken, 'refreshToken');
        }
        callBackFunction();
    }
}