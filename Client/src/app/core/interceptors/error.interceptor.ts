import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const baseError = {
          ...error.error,
          statusCode: error.error?.statusCode || error.status,
          message: error.error?.message || error.message,
        }

        if (error.error?.errors?.length > 0) {
          baseError.message = error.error.errors[0]
        }

        return throwError(() => baseError)
      })
    )
  }
}
