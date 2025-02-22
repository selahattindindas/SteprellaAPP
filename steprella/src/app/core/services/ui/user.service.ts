import { inject, Injectable } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { ListUser } from "../../models/users/list-user";
import { BaseResponse } from "../../models/base-responses/base-response";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly httpClientService = inject(HttpClientService);

    getCurrentUserDetails(): Observable<ListUser> {
        return this.httpClientService.get<BaseResponse<ListUser>>({
            controller: "users",
            action: "current-user"
        }).pipe(
            map(response => response.data || null)
        );
    }
}