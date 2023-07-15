import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: 'API', useValue: environment.api },
        MockProvider(UserService, {
          getUserData: () => of({ username: 'test', isLogged: true, isOfflineMode: false }),
        }),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signIn should trigger sending a login request', () => {
    const response: any = {
      status: 'success',
      data: 'thisistoken',
    };

    service.signIn('lorem', 'ipsum');

    const req = httpMock.expectOne(`${environment.api.origin}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('#refresh should trigger sending a login request', () => {
    const response: any = {
      status: 'success',
      data: 'thisistoken',
    };

    service.refresh();

    const req = httpMock.expectOne(`${environment.api.origin}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('#getAccessToken should return the last stored token after the last successful login', () => {
    const dummyToken = 'thisistoken';

    service.signIn('lorem', 'ipsum');

    const req = httpMock.expectOne(`${environment.api.origin}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 'success',
      data: dummyToken,
    });

    expect(service.getAccessToken()).toBe(dummyToken);
  });

  it('#getAccessToken should return null when the last login attempt failed', () => {
    service.signIn('lorem', 'thisiswrongpassword');

    const req = httpMock.expectOne(`${environment.api.origin}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: 'error',
      data: null,
      message: 'lorem ipsum',
    });

    expect(service.getAccessToken()).toBe(null);
  });

  it('#getToken should return null when user has not logged in yet', () => {
    expect(service.getAccessToken()).toBe(null);
  });
});
