import { TestBed } from '@angular/core/testing';
import { UserLocaleService } from './user-locale.service';

describe('UserLocaleService', () => {
  let service: UserLocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLocaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
