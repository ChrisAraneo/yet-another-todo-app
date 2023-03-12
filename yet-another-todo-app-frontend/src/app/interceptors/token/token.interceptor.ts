import {
  HttpBackend,
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, Observable, switchMap } from 'rxjs';
import { ApiResponse, ApiResponseStatus } from 'src/app/services/api-client/api-client.types';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly url = `${environment.api.origin}`; // TODO Extract to token
  private readonly loginEndpoint = `${this.url}/login`;

  private username: string = 'loremuser'; // TODO User providing username and password in form
  private password: string = 'pleasechangeme';
  private token = new BehaviorSubject<string | null>(null);
  private http: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (request.method === 'OPTIONS') {
      return next.handle(request);
    }

    return next
      .handle(
        request.clone({
          headers: request.headers.append('Authorization', `Bearer ${this.token.getValue()}`),
        }),
      )
      .pipe(
        catchError((error) => {
          console.error(error);

          return this.handleResponseError(request, next);
        }),
      );
  }

  handleResponseError(request: HttpRequest<unknown>, next: any): Observable<any> {
    return this.refreshToken(this.username, this.password).pipe(
      switchMap((token: string | null) => {
        this.token.next(token);

        return next.handle(
          request.clone({
            headers: request.headers.append('Authorization', `Bearer ${token}`),
          }),
        );
      }),
    );
  }

  private refreshToken(username: string, password: string): Observable<string | null> {
    // TODO Refactor into AuthService
    return this.http.post<ApiResponse<string>>(this.loginEndpoint, { username, password }).pipe(
      first(),
      map((response: ApiResponse<string | null>) => {
        if (response && response.status === ApiResponseStatus.Success) {
          return response.data || null;
        }

        return null;
      }),
    );
  }
}
