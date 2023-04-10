import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, filter, first, map, mergeMap, tap } from 'rxjs';
import { SignInData } from 'src/app/models/sign-in-data.model';
import { ApiResponse, ApiResponseStatus } from '../api-client/api-client.types';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly loginEndpoint;

  private username = new BehaviorSubject<string>('');
  private password = new BehaviorSubject<string | null>(null);
  private token = new BehaviorSubject<string | null>(null);
  private subscription = new Subscription();

  constructor(
    @Inject('API') public api: any,
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.loginEndpoint = `${this.api.origin}/login`;

    this.subscribeToUserChanges();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  refreshToken(): Observable<any> {
    return this.fetchNewToken(this.username.getValue(), this.password.getValue()).pipe(
      tap((token: string | null) => {
        this.update(token);
      }),
    );
  }

  signIn(username: string, password: string): void {
    this.userService.setUser(username, password);
  }

  getToken(): string | null {
    return this.token.getValue();
  }

  private subscribeToUserChanges(): void {
    const filterByExistingUsernameAndPassword = filter(
      (user: SignInData) => !!user.username && !!user.password,
    );

    const emitUsername = tap((user: SignInData) => {
      this.username.next(user.username);
    });

    const emitPassword = tap((user: SignInData) => {
      this.password.next(user.password);
    });

    const fetchNewTokenOnUserChange = mergeMap((user: SignInData) => {
      return this.fetchNewToken(user.username, user.password);
    });

    this.subscription = this.userService
      .getUser()
      .pipe(
        filterByExistingUsernameAndPassword,
        emitUsername,
        emitPassword,
        fetchNewTokenOnUserChange,
      )
      .subscribe((token: string | null) => {
        this.update(token);
      });
  }

  private fetchNewToken(username: string, password: string | null): Observable<string | null> {
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

  private update(token: string | null): void {
    this.setToken(token);
    this.setUserAsLoggedIfTokenExists(token);
    this.removePassword();
  }

  private setToken(token: string | null): void {
    this.token.next(token);
  }

  private removePassword(): void {
    this.userService.removePassword();
  }

  private setUserAsLoggedIfTokenExists(token: string | null): void {
    this.userService.setIsUserLogged(!!token);
  }
}
