import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { first, of } from 'rxjs';
import {
  TableConfiguration,
  TimelineConfiguration,
} from '../../store/types/view-configuration.type';
import { ViewConfigurationService } from './view-configuration.service';

// TODO Add remaining unit tests
describe('ViewConfigurationService', () => {
  let service: ViewConfigurationService;
  let store: Store;
  let timelineConfiguration: TimelineConfiguration;
  let tableConfiguration: TableConfiguration;

  beforeEach(() => {
    timelineConfiguration = {
      startDate: new Date(),
      endDate: new Date(),
      order: [],
      filter: [],
    };
    tableConfiguration = {
      sort: {
        id: 'creationDate',
        start: 'desc',
        disableClear: false,
      },
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(Store, {
          select: (key: any) => {
            if (key === 'viewConfiguration') {
              return of({
                timeline: { ...timelineConfiguration },
                table: { ...tableConfiguration },
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

  it('#getTimelineConfiguration should return timeline configuration object', () => {
    service
      .getTimelineConfiguration()
      .pipe(first())
      .subscribe((config) => {
        expect(config).toEqual(timelineConfiguration);
      });
  });

  it('#getTableConfiguration should return table configuration object', () => {
    service
      .getTableConfiguration()
      .pipe(first())
      .subscribe((config) => {
        expect(config).toEqual(tableConfiguration);
      });
  });
});
