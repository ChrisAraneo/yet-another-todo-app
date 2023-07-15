import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiClientService } from '../api-client/api-client.service';
import { OperationIdGeneratorService } from '../operation-id-generator/operation-id-generator.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const dummyOperationId = '-';

  let service: AuthService;
  let apiClientService: ApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: 'API', useValue: environment.api },
        MockProvider(UserService, {
          getUserData: () => of({ username: 'lorem', isLogged: true, isOfflineMode: false }),
          getUsername: () => of('lorem'),
        }),
        MockProvider(OperationIdGeneratorService, {
          generate: () => dummyOperationId,
        }),
      ],
    });
    service = TestBed.inject(AuthService);
    apiClientService = service.apiClientService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signIn should call ApiClientService #signIn', () => {
    const dispatchSpy = spyOn(apiClientService, 'signIn').and.callThrough();

    service.signIn('lorem', 'ipsum').subscribe().unsubscribe();

    expect(dispatchSpy).toHaveBeenCalledWith('lorem', 'ipsum', dummyOperationId);
  });

  // TODO Prepare rest of unit tests

  // it('#refresh should trigger sending a login request', () => {
  //   const response: any = {
  //     status: 'success',
  //     data: 'thisistoken',
  //   };

  //   service.signIn('lorem', 'ipsum').subscribe(() => {
  //     service.refresh().subscribe().unsubscribe();
  //   });

  //   const req = httpMock.expectOne(`${environment.api.origin}/login`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush(response);
  // });

  // it('#getAccessToken should return the last stored token after the last successful login', () => {
  //   const dummyToken = 'thisistoken';

  //   service.signIn('lorem', 'ipsum').subscribe().unsubscribe();

  //   const req = httpMock.expectOne(`${environment.api.origin}/login`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush({
  //     status: 'success',
  //     data: dummyToken,
  //   });

  //   expect(service.getAccessToken()).toBe(dummyToken);
  // });

  // it('#getAccessToken should return null when the last login attempt failed', () => {
  //   service.signIn('lorem', 'thisiswrongpassword').subscribe().unsubscribe();

  //   const req = httpMock.expectOne(`${environment.api.origin}/login`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush({
  //     status: 'error',
  //     data: null,
  //     message: 'lorem ipsum',
  //   });

  //   expect(service.getAccessToken()).toBe(null);
  // });

  // it('#getToken should return null when user has not logged in yet', () => {
  //   expect(service.getAccessToken()).toBe(null);
  // });
});
