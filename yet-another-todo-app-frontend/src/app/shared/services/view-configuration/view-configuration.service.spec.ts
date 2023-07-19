import { TestBed } from '@angular/core/testing';
import { ViewConfigurationService } from './view-configuration.service';

describe('ViewConfigurationService', () => {
  let service: ViewConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
