import { Injectable, inject } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { ListAddress } from "../../models/addresses/list-address";
import { BaseResponse } from "../../models/base-responses/base-response";
import { map, Observable } from "rxjs";
import { CreateAddress } from "../../models/addresses/create-address";
import { UpdateAddress } from "../../models/addresses/update-address";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private readonly httpClientService = inject(HttpClientService);

    getAll(): Observable<ListAddress[]> {
        return this.httpClientService.get<BaseResponse<ListAddress[]>>({
            controller: 'addresses',
            action: 'get-addresses',
        }).pipe(
            map(response => {
                return response.data && response.data.length > 0 ? response.data : [];
            })
        );
    }

    getById(id: number): Observable<ListAddress> {
        return this.httpClientService.get<BaseResponse<ListAddress>>({
            controller: "addresses"
        }, id).pipe(
            map(response => response.data || null)
        );
    }

    create(body: CreateAddress): Observable<CreateAddress> {
        return this.httpClientService.post<CreateAddress>({
          controller: "addresses",
          action: "create-address"
        }, body);
    }

    update(body: UpdateAddress): Observable<UpdateAddress> {
        return this.httpClientService.put<UpdateAddress>({
          controller: "addresses",
          action: "update-address"
        }, body);
    }

    delete(id:number): Observable<ListAddress> {
        return this.httpClientService.delete<ListAddress>({
          controller: "addresses"
        }, id);
    }
 }