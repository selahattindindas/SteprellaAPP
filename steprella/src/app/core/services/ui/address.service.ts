import { Injectable, inject } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { ListAddress } from "../../models/addresses/list-address";
import { BaseResponse } from "../../models/base-responses/base-response";
import { map, Observable } from "rxjs";
import { CreateAddress } from "../../models/addresses/create-address";

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

//     create(body: CreateAddress, successCallBack: () => void): Observable<void> {
//         const observable = this.httpClientService.post({
//           controller: "addresses",
//           action: "create-address"
//         }, body);
    
//         return await firstValueFrom(observable)
//           .then(response => {
//             successCallBack();
//             return response;
//           });
//       }
 }