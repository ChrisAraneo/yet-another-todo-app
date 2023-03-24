import {
  HttpBackend,
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  first,
  map,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { ApiResponse, ApiResponseStatus } from 'src/app/services/api-client/api-client.types';
import { UserService } from 'src/app/services/user/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {
  private readonly loginEndpoint;

  private username = new BehaviorSubject<string>('');
  private password = new BehaviorSubject<string | null>(null);
  private token = new BehaviorSubject<string | null>(null);
  private http: HttpClient;
  private subscription: Subscription;

  constructor(
    @Inject('API') public api: any,
    httpBackend: HttpBackend,
    private userService: UserService,
  ) {
    this.loginEndpoint = `${this.api.origin}/login`;
    this.http = new HttpClient(httpBackend);

    this.subscription = userService
      .getUser()
      .pipe(filter((user) => !!user.username && !!user.password))
      .subscribe((user) => {
        this.username.next(user.username);
        this.password.next(user.password);
      });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
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
    return this.refreshToken(this.username.getValue(), this.password.getValue()).pipe(
      switchMap((token: string | null) => {
        this.setTokenAndRemovePassword(token);

        return next.handle(
          request.clone({
            headers: request.headers.append('Authorization', `Bearer ${token}`),
          }),
        );
      }),
    );
  }

  private refreshToken(username: string, password: string | null): Observable<string | null> {
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

  private setTokenAndRemovePassword(token: string | null): void {
    this.token.next(token);
    this.userService.removePassword();
  }
}
