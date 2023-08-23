import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiClientService } from '../api-client/api-client.service';
import { OperationIdGeneratorService } from '../operation-id-generator/operation-id-generator.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const dummyOperationId = '-';

  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: 'API', useValue: environment.api },
        MockProvider(ApiClientService, {
          signIn: async () => ({
            accessToken: 'acc3sst0k3n',
            refreshToken: 'r3fr3shT0k3n',
          }),
          refreshAccessToken: async (refreshToken) => {
            if (refreshToken === 'r3fr3shT0k3n') {
              return {
                accessToken: 'acc3sst0k3n_2',
                refreshToken: 'r3fr3shT0k3n_2',
              };
            } else {
              return null;
            }
          },
        }),
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signIn should update tokens and then #getAccessToken should return valid access token', () => {
    // TODO Spec has no expectations, fix
    firstValueFrom(service.signIn('lorem', 'ipsum')).then(() => {
      expect(service.getAccessToken()).toEqual('acc3sst0k3n');
    });
  });

  it('#getAccessToken call after #signIn then #refresh should return updated valid access token', () => {
    // TODO Spec has no expectations, fix
    firstValueFrom(service.signIn('lorem', 'ipsum')).then(() => {
      firstValueFrom(service.refresh()).then(() => {
        expect(service.getAccessToken()).toEqual('acc3sst0k3n_2');
      });
    });
  });

  it('#getAccessToken call after #signIn then #signOut should return null', () => {
    // TODO Spec has no expectations, fix
    firstValueFrom(service.signIn('lorem', 'ipsum')).then(() => {
      service.signOut();

      expect(service.getAccessToken()).toEqual(null);
    });
  });

  it('#getRefreshEndpoint should return valid endpoint', () => {
    expect(service.getRefreshEndpoint()).toEqual(environment.api.refreshEndpoint);
  });
});
