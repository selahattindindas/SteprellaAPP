import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';

                if (error.error && error.error.detail) {
                    errorMessage = error.error.detail;
                } else {
                    errorMessage = `An error occurred: ${error.statusText}`;
                }

                console.error('HTTP Error:', errorMessage);

                return throwError(() => new HttpErrorResponse({
                    error: errorMessage,
                    status: error.status,
                    statusText: error.statusText
                }));
            })
        );
    }
}