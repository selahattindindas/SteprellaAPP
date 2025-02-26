import { inject, Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/base-responses/base-response';
import { ListFavorite } from '../../models/favorites/list-favorite';
import { CreateFavorite } from '../../models/favorites/create-favorite';

@Injectable({
    providedIn: 'root'
})

export class FavoriteService {
    private readonly httpClientService = inject(HttpClientService);

    getFavoritesByUserId(page: number, size: number): Observable<BaseResponse<ListFavorite[]>> {
        return this.httpClientService.get<BaseResponse<ListFavorite[]>>({
            controller: 'favorites',
            action: 'get-favorites',
            queryString: `page=${page}&size=${size}`
        }).pipe(
            map(response => ({
                totalCount: response.totalCount,
                data: response.data.length > 0 ? response.data : []
            }))
        );
    }

    create(body: CreateFavorite): Observable<CreateFavorite> {
        return this.httpClientService.post<CreateFavorite>({
            controller: 'favorites',
            action: 'create-favorite'
        }, body)
    }

    delete(id: number): Observable<void> {
        return this.httpClientService.delete<void>({
            controller: 'favorites',
        }, id)
    }
}