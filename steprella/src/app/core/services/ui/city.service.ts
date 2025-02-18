import { Injectable, inject } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { ListCity } from "../../models/cities/list-city";
import { BaseResponse } from "../../models/base-responses/base-response";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private readonly httpClientService = inject(HttpClientService);

    getAll(): Observable<ListCity[]> {
        return this.httpClientService.get<BaseResponse<ListCity[]>>({
            controller: 'cities',
            action: 'get-all',
        }).pipe(
            map(response => {
                return response.data && response.data.length > 0 ? response.data : [];
            })
        );
    }
}