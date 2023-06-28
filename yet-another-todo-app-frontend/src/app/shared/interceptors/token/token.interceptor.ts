import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, mergeMap } from 'rxjs';
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
          headers: request.headers.append(
            'Authorization',
            `Bearer ${this.authService.getAccessToken()}`,
          ),
        }),
      )
      .pipe(
        catchError((error) => {
          console.error(error);

          // TODO Add to httpLog ??

          return this.handleResponseError(request, next);
        }),
      );
  }

  private handleResponseError(request: HttpRequest<unknown>, next: any): Observable<any> {
    const isRefreshUrl = request.url === this.authService.getRefreshEndpoint();

    if (isRefreshUrl) {
      return next.handle(request);
    }

    return this.authService.refresh().pipe(
      delay(250),
      mergeMap((response) => {
        return next.handle(
          request.clone({
            headers: request.headers.append('Authorization', `Bearer ${response?.accessToken}`),
          }),
        );
      }),
    );
  }
}
