import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/current-user.type';
import { setIsLogged, setIsOfflineMode, setUsername } from '../../store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public store: Store<{ user: CurrentUser }>) {}

  getUserData(): Observable<CurrentUser> {
    return this.store.select('user');
  }

  getUsername(): Observable<string | null> {
    return this.getUserData().pipe(map((data) => data.username));
  }

  setUsername(username: string): void {
    this.store.dispatch(setUsername({ username }));
  }

  getIsUserLogged(): Observable<boolean> {
    return this.getUserData().pipe(map((data) => !!(data && data.isLogged)));
  }

  setIsUserLogged(value: boolean): void {
    this.store.dispatch(setIsLogged({ isLogged: value }));
  }

  getIsOfflineMode(): Observable<boolean> {
    return this.getUserData().pipe(map((data) => !!(data && data.isOfflineMode)));
  }

  setIsOfflineMode(value: boolean): void {
    this.store.dispatch(setIsOfflineMode({ isOfflineMode: value }));
  }
}
