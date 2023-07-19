import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ViewConfigurationService } from './view-configuration.service';

// TODO Unit tests for #setTimelineStartDate, #setTimelineEndDate and #getTimelineConfiguration
describe('ViewConfigurationService', () => {
  let service: ViewConfigurationService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(Store, {
          select: (key: any) => {
            if (key === 'viewConfiguration') {
              return of({
                timeline: {
                  startDate: new Date(),
                  endDate: new Date(),
                },
              });
            }
            return of(undefined);
          },
        }),
      ],
    });
    service = TestBed.inject(ViewConfigurationService);
    store = service.store;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
