import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/current-user.model';
import {
  removePassword,
  setIsLogged,
  setPassword,
  setUsername,
} from 'src/app/store/actions/user.actions';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let store: Store;
  const dummyCurrentUser: CurrentUser = {
    user: {
      username: 'lorem',
      password: 'ipsum',
    },
    isLogged: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockProvider(Store, {
          select: (key: any) => {
            if (key === 'user') {
              return of(dummyCurrentUser);
            }
            return of(undefined);
          },
        }),
        UserService,
      ],
    });

    service = TestBed.inject(UserService);
    store = service.store;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getUser should return current user', () => {
    service.getUser().subscribe((user) => {
      expect(user).toEqual(dummyCurrentUser.user);
    });
  });

  it('#setUser should dispatch set username action and set password action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const usernameAction = setUsername({ username: 'test-username' });
    const passwordAction = setPassword({ password: 'test-password' });

    service.setUser('test-username', 'test-password');

    expect(dispatchSpy).toHaveBeenCalledWith(usernameAction);
    expect(dispatchSpy).toHaveBeenCalledWith(passwordAction);
  });

  it('#removePassword should dispatch remove password action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const action = removePassword();

    service.removePassword();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#getIsUserLogged should return whether the user is logged in', () => {
    service.getIsUserLogged().subscribe((isLogged) => {
      expect(isLogged).toEqual(dummyCurrentUser.isLogged);
    });
  });

  it('#setIsUserLogged should dispatch set is logged action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const action = setIsLogged({ isLogged: false });

    service.setIsUserLogged(false);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
