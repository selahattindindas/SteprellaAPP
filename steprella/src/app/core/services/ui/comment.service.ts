import { Injectable, inject } from "@angular/core";
import { HttpClientService } from "../common/http-client.service";
import { map, Observable } from "rxjs";
import { ListComment } from "../../models/comments/list-comment";
import { BaseResponse } from "../../models/base-responses/base-response";
import { CreateComment } from "../../models/comments/create-comment";
import { UpdateComment } from "../../models/comments/update-comment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private readonly httpClientService = inject(HttpClientService);

    getComments(): Observable<ListComment[]> {
        return this.httpClientService.get<BaseResponse<ListComment[]>>({
            controller: 'comments',
            action: 'get-comments',
        }).pipe(
            map(response => {
                return response.data && response.data.length > 0 ? response.data : [];
            })
        );
    }

    getById(id: number): Observable<ListComment> {
        return this.httpClientService.get<BaseResponse<ListComment>>({
            controller: "comments"
        }, id).pipe(
            map(response => response.data || null)
        );
    }

    create(body: CreateComment): Observable<CreateComment> {
        return this.httpClientService.post<CreateComment>({
            controller: "comments",
            action: "create-comment"
        }, body);
    }

    update(body: UpdateComment): Observable<UpdateComment> {
        return this.httpClientService.put<UpdateComment>({
            controller: "comments",
            action: "update-comment"
        }, body);
    }

    delete(id: number): Observable<ListComment> {
        return this.httpClientService.delete<ListComment>({
            controller: "comments"
        }, id);
    }
}