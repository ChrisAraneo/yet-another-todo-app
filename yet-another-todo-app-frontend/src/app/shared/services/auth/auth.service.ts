import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, from, of, tap } from 'rxjs';
import { ApiClientService } from '../api-client/api-client.service';
import { OperationIdGeneratorService } from '../operation-id-generator/operation-id-generator.service';
import { UserService } from '../user/user.service';
import { LoginResponse, RefreshResponse } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private username = new BehaviorSubject<string | null>(null);
  private accessToken = new BehaviorSubject<string | null>(null);
  private refreshToken = new BehaviorSubject<string | null>(null);
  private subscription = new Subscription();

  constructor(
    @Inject('API') public api: any,
    private apiClientService: ApiClientService,
    private userService: UserService,
    private operationIdGeneratorService: OperationIdGeneratorService,
  ) {
    this.subscribeToUsernameChanges();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  signIn(username: string, password: string): Observable<LoginResponse | null> {
    this.setIsOfflineMode(false);

    const operationId = this.operationIdGeneratorService.generate();

    return from(this.apiClientService.signIn(username, password, operationId)).pipe(
      tap((response) => {
        const accessToken = response?.accessToken;
        const refreshToken = response?.refreshToken;

        this.setUsername(username);
        accessToken && this.setAccessToken(accessToken);
        refreshToken && this.setRefreshToken(refreshToken);
        this.setIsLoggedBasedOnTokenValue(accessToken);
      }),
    );
  }

  refresh(): Observable<RefreshResponse | null> {
    const operationId = this.operationIdGeneratorService.generate();
    const currentRefreshToken = this.refreshToken.getValue();

    if (typeof currentRefreshToken !== 'string' || currentRefreshToken === '') {
      return of(null);
    }

    return from(this.apiClientService.refreshAccessToken(currentRefreshToken, operationId)).pipe(
      tap((response) => {
        const accessToken = response?.accessToken;

        accessToken && this.setAccessToken(accessToken);
      }),
    );
  }

  signOut(): void {
    this.setIsOfflineMode(true);
    this.setUsername('');
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setIsLoggedBasedOnTokenValue('');
  }

  getAccessToken(): string | null {
    return this.accessToken.getValue();
  }

  getRefreshEndpoint(): string {
    return this.api.refreshEndpoint;
  }

  private subscribeToUsernameChanges(): void {
    this.userService.getUsername().subscribe((username) => {
      this.username.next(username);
    });
  }

  private setUsername(username: string): void {
    this.userService.setUsername(username);
  }

  private setAccessToken(token: string | null): void {
    this.accessToken.next(token);
  }

  private setRefreshToken(refreshToken: string | null): void {
    this.refreshToken.next(refreshToken);
  }

  private setIsLoggedBasedOnTokenValue(token: string | undefined): void {
    this.userService.setIsUserLogged(!!token);
  }

  private setIsOfflineMode(value: boolean): void {
    this.userService.setIsOfflineMode(value);
  }
}
