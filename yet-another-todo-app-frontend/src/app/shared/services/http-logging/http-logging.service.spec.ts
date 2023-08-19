import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { environment } from 'src/environments/environment';
import { HttpLoggingService } from './http-logging.service';

describe('HttpLoggingService', () => {
  let service: HttpLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: 'API', useValue: environment.api }, MockProvider(Store)],
    });
    service = TestBed.inject(HttpLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
