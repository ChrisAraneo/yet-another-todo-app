import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/current-user.model';
import { setIsLogged, setUsername } from '../../store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public store: Store<{ user: CurrentUser }>) {}

  getUsername(): Observable<string | null> {
    return this.store.select('user').pipe(map((data) => data.username));
  }

  setUsername(username: string): void {
    this.store.dispatch(setUsername({ username }));
  }

  getIsUserLogged(): Observable<boolean> {
    return this.store.select('user').pipe(map((data) => !!(data && data.isLogged)));
  }

  setIsUserLogged(value: boolean): void {
    this.store.dispatch(setIsLogged({ isLogged: value }));
  }
}
