import { TestBed } from '@angular/core/testing';
import { HttpLoggingService } from './http-logging.service';

describe('HttpLoggingService', () => {
  let service: HttpLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
