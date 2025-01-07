import { inject, Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VerificationService {
    private readonly httpClientService = inject(HttpClientService);

    sendVerificationCode(email: string): Observable<unknown> {
        return this.httpClientService.post({
            controller: "verification-codes",
            action: "send-code",
            queryString: `email=${email}`,
            withCredentials: true
        }, { email });
    }

    verifyCode(code: string, email: string): Observable<unknown> {
        return this.httpClientService.post({
            controller: "verification-codes",
            action: "verify-code",
            queryString: `code=${code}&email=${email}`,
            withCredentials: true
        }, { code, email });
    }

    resendCode(email: string): Observable<unknown> {
        return this.httpClientService.post({
            controller: 'verification-codes',
            action: 'resend-code',
            queryString: `email=${email}`,
            withCredentials: true
        }, { email });
    }
}