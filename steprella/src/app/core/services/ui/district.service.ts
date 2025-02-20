import { Injectable, inject } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { ListDistrict } from "../../models/districts/list-district";
import { BaseResponse } from "../../models/base-responses/base-response";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DistrictService {
    private readonly httpClientService = inject(HttpClientService);

    getByCityId(cityId: number): Observable<ListDistrict[]> {
        return this.httpClientService.get<BaseResponse<ListDistrict[]>>({
            controller: 'districts',
            action: 'by-city-id',
        }, cityId).pipe(
            map(response => {
                return response.data && response.data.length > 0 ? response.data : [];
            })
        );
    }
}