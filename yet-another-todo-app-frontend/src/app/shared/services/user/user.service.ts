import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/current-user.model';
import { SignInData } from 'src/app/shared/models/sign-in-data.model';
import {
  removePassword,
  setIsLogged,
  setPassword,
  setUsername,
} from '../../store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public store: Store<{ user: CurrentUser }>) {}

  getUser(): Observable<SignInData> {
    return this.store.select('user').pipe(map((data) => data.user));
  }

  setUser(username: string, password: string): void {
    this.store.dispatch(setUsername({ username }));
    this.store.dispatch(setPassword({ password }));
  }

  removePassword(): void {
    this.store.dispatch(removePassword());
  }

  getIsUserLogged(): Observable<boolean> {
    return this.store.select('user').pipe(map((data) => !!(data && data.isLogged)));
  }

  setIsUserLogged(value: boolean): void {
    this.store.dispatch(setIsLogged({ isLogged: value }));
  }
}
