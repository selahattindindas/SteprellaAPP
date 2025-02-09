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

    getFavoritesByUserId(userId: number, page: number, size: number): Observable<BaseResponse<ListFavorite[]>> {
        return this.httpClientService.get<BaseResponse<ListFavorite[]>>({
            controller: 'favorites',
            action: `by-user-id/${userId}`,
            queryString: `page=${page}&size=${size}`
        }).pipe(
            map(response => ({
                totalCount: response.totalCount,
                data: response.data.length > 0 ? response.data : []
            }))
        );
    }

    async create(body: CreateFavorite): Promise<void> {
        const observable: Observable<CreateFavorite> = this.httpClientService.post({
            controller: 'favorites',
            action: 'create-favorite'
        }, body)

        await firstValueFrom(observable);
    }

    async delete(id: number): Promise<void> {
        const observable: Observable<ListFavorite> = this.httpClientService.delete({
            controller: 'favorites',
        }, id)

        await firstValueFrom(observable);
    }
}