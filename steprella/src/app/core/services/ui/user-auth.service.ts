import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { AuthService } from '../common/auth.service';
import { Login } from '../../models/auth/login';
import { Token } from '../../models/auth/token';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Register } from '../../models/auth/register';
import { BaseResponse } from '../../models/base-responses/base-response';
import { UpdateUser } from '../../models/users/update-user-';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    private readonly httpClientService = inject(HttpClientService);
    private readonly authService = inject(AuthService);

    register(body: Register): Observable<Register> {
        return this.httpClientService.post<Register>({
            controller: 'auth',
            action: 'register',
            withCredentials: true
        }, body);
    }

    update(body: UpdateUser):Observable<UpdateUser>{
        return this.httpClientService.put<UpdateUser>({
            controller: 'auth',
            action: 'update',
            withCredentials: true
        }, body);
    }

    login(body: Login): Observable<BaseResponse<any>> {
        return this.httpClientService.post<any | Token>({
            controller: "auth",
            action: "login",
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
