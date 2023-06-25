import { TestBed } from '@angular/core/testing';
import { OperationIdInterceptor } from './operation-id.interceptor';

describe('OperationIdInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [OperationIdInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: OperationIdInterceptor = TestBed.inject(OperationIdInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
