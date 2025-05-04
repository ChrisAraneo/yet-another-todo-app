import { TestBed } from '@angular/core/testing';

import { NavigatorRefService as NavigatorReferenceService } from './navigator-ref.service';

describe('NavigatorRefService', () => {
  let service: NavigatorReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatorReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
