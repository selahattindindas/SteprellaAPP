import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { AuthService } from '../common/auth.service';
import { Login } from '../../models/auth/login';
import { Token } from '../../models/auth/token';
import { firstValueFrom, Observable } from 'rxjs';
import { Register } from '../../models/auth/register';
import { BaseResponse } from '../../models/base-responses/base-response';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    private readonly httpClientService = inject(HttpClientService);
    private readonly authService = inject(AuthService);

    async register(body: Register, successCallBack: () => void): Promise<Register> {
        const observable = this.httpClientService.post<Register>({
            controller: 'auth',
            action: 'register',
            withCredentials: true
        }, body);

        const response = await firstValueFrom(observable);
        successCallBack();
        return response;
    }

    async login(body: Login, callBackFunction: () => void): Promise<any> {
        const observable: Observable<any | Token> = this.httpClientService.post({
            controller: "auth",
            action: "login",
            withCredentials: true
        }, body);

        const response: BaseResponse<Token> = await firstValueFrom(observable);

        if (response && response.data) {
            this.authService.setToken(response.data.accessToken, 'accessToken');
            this.authService.setToken(response.data.refreshToken, 'refreshToken');
        }
        callBackFunction();
    }

    async refreshToken(refreshToken: string, callBackFunction: (state: boolean) => void): Promise<any> {
        const observable: Observable<any | Token> = this.httpClientService.post({
            controller: 'auth',
            action: 'refresh-token',
            withCredentials: true
        }, { refreshToken: refreshToken });

        try {
            const response: BaseResponse<Token> = await firstValueFrom(observable);

            if (response && response.data) {
                this.authService.setToken(response.data.accessToken, 'accessToken');
                this.authService.setToken(response.data.refreshToken, 'refreshToken');
            }

            callBackFunction(!!response);
        } catch {
            callBackFunction(false);
        }
    }
}
