import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignInData } from 'src/app/models/sign-in-data.model';
import { removePassword, setPassword, setUsername } from 'src/app/store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store<{ user: SignInData }>) {}

  getUser(): Observable<SignInData> {
    return this.store.select('user');
  }

  setUser(username: string, password: string): void {
    this.store.dispatch(setUsername({ username }));
    this.store.dispatch(setPassword({ password }));
  }

  removePassword(): void {
    this.store.dispatch(removePassword());
  }
}
