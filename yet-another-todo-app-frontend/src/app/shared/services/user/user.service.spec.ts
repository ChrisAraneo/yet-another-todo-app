import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/current-user.type';
import { setIsLogged, setIsOfflineMode, setUsername } from '../../store/actions/user.actions';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let store: Store;
  const dummyCurrentUser: CurrentUser = {
    username: 'lorem',
    isLogged: true,
    isOfflineMode: false,
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

  it('#getUserData should return current user data', () => {
    service.getUserData().subscribe((user) => {
      expect(user).toEqual(dummyCurrentUser);
    });
  });

  it('#getUsername should return current user username', () => {
    service.getUsername().subscribe((username) => {
      expect(username).toEqual(dummyCurrentUser.username);
    });
  });

  it('#setUsername should dispatch set username action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const usernameAction = setUsername({ username: 'test-username' });

    service.setUsername('test-username');

    expect(dispatchSpy).toHaveBeenCalledWith(usernameAction);
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

  it('#getIsOfflineMode should return whether the user is in offline mode', () => {
    service.getIsOfflineMode().subscribe((isOfflineMode) => {
      expect(isOfflineMode).toEqual(dummyCurrentUser.isOfflineMode);
    });
  });

  it('#setIsOfflineMode should dispatch set is offline mode action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const action = setIsOfflineMode({ isOfflineMode: true });

    service.setIsOfflineMode(true);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
