import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: 'API', useValue: environment.api },
        LoggingInterceptor,
        MockProvider(Store, {
          select: (key: any) => {
            if (key === 'httpLog') {
              return of([]);
            }
            return of(undefined);
          },
        }),
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: LoggingInterceptor = TestBed.inject(LoggingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
