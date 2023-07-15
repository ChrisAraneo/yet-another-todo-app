import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(AuthService, {
          getAccessToken: () => '1010',
          refresh: () => of({ accessToken: '10101', refreshToken: '22022' }),
        }),
        TokenInterceptor,
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
