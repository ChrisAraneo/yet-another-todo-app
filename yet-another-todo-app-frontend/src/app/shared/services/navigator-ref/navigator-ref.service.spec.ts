import { TestBed } from '@angular/core/testing';
import { NavigatorRefService } from './navigator-ref.service';

describe('NavigatorRefService', () => {
  let service: NavigatorRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatorRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
