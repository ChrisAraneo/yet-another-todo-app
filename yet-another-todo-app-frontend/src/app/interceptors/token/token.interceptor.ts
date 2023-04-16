import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (request.method === 'OPTIONS') {
      return next.handle(request);
    }

    return next
      .handle(
        request.clone({
          headers: request.headers.append('Authorization', `Bearer ${this.authService.getToken()}`),
        }),
      )
      .pipe(
        catchError((error) => {
          console.error(error);

          return this.handleResponseError(request, next);
        }),
      );
  }

  private handleResponseError(request: HttpRequest<unknown>, next: any): Observable<any> {
    return this.authService.refreshToken().pipe(
      mergeMap(() => {
        return next.handle(
          request.clone({
            headers: request.headers.append(
              'Authorization',
              `Bearer ${this.authService.getToken()}`,
            ),
          }),
        );
      }),
    );
  }
}
