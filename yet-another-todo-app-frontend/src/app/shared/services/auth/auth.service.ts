import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, first, map, tap } from 'rxjs';
import { ApiResponse, ApiResponseStatus } from '../api-client/api-client.types';
import { UserService } from '../user/user.service';
import { LoginResponse, RefreshResponse } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly loginEndpoint;
  private readonly refreshEndpoint;

  private username = new BehaviorSubject<string | null>(null);
  private accessToken = new BehaviorSubject<string | null>(null);
  private refreshToken = new BehaviorSubject<string | null>(null);
  private subscription = new Subscription();

  constructor(
    @Inject('API') public api: any,
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.loginEndpoint = `${this.api.origin}/login`;
    this.refreshEndpoint = `${this.api.origin}/refresh`;

    this.userService.getUsername().subscribe((username) => {
      this.username.next(username);
    });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  signIn(username: string, password: string): Observable<LoginResponse | null> {
    return this.http
      .post<ApiResponse<LoginResponse>>(this.loginEndpoint, { username, password })
      .pipe(
        first(),
        tap((response) => {
          const accessToken = response?.data?.accessToken;
          const refreshToken = response?.data?.refreshToken;

          this.setUsername(username);
          accessToken && this.setAccessToken(accessToken);
          refreshToken && this.setRefreshToken(refreshToken);
          this.setIsLoggedBasedOnTokenValue(accessToken);
        }),
        map((response) => {
          return response.data || null;
        }),
      );
  }

  refresh(): Observable<RefreshResponse | null> {
    return this.refreshAccessToken(this.refreshToken.getValue() || '').pipe(
      tap((response) => {
        const accessToken = response?.accessToken;

        accessToken && this.setAccessToken(accessToken);
      }),
      map((response) => {
        return response || null;
      }),
    );
  }

  getAccessToken(): string | null {
    return this.accessToken.getValue();
  }

  getRefreshEndpoint(): string {
    return this.refreshEndpoint;
  }

  private refreshAccessToken(refreshToken: string): Observable<RefreshResponse | null> {
    return this.http
      .post<ApiResponse<RefreshResponse>>(this.refreshEndpoint, { refreshToken })
      .pipe(
        first(),
        map((response: ApiResponse<RefreshResponse | null>) => {
          if (response && response.status === ApiResponseStatus.Success) {
            return response.data || null;
          }

          return null;
        }),
      );
  }

  private setUsername(username: string): void {
    this.userService.setUsername(username);
  }

  private setAccessToken(token: string): void {
    this.accessToken.next(token);
  }

  private setRefreshToken(refreshToken: string): void {
    this.refreshToken.next(refreshToken);
  }

  private setIsLoggedBasedOnTokenValue(token: string | undefined): void {
    this.userService.setIsUserLogged(!!token);
  }
}
