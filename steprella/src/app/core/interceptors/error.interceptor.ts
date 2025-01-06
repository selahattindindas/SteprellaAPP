import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SweetAlertService } from '../services/common/sweet-alert.service';
import { Icon } from '../services/common/sweet-alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly sweetAlertService = inject(SweetAlertService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const problemDetails = error.error as { detail: string };
        const errorMessage = problemDetails?.detail || 'Bir hata oluştu.';

        switch (error.status) {
          case HttpStatusCode.BadRequest:
          case HttpStatusCode.Unauthorized:
          case HttpStatusCode.Forbidden:
          case HttpStatusCode.NotFound:
          case HttpStatusCode.MethodNotAllowed:
          case HttpStatusCode.InternalServerError:
          default:
            this.sweetAlertService.showMessage(errorMessage, Icon.ERROR);
            break;
        }
        return throwError(() => new Error(errorMessage));
      }
      ))
  }
}