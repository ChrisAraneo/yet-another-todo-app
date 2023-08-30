import { TestBed } from '@angular/core/testing';
import { MatSortable } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { first, of } from 'rxjs';
import { InProgressTaskState, NotStartedTaskState } from '../../models/task-state.model';
import {
  setTableSort,
  setTimelineEndDate,
  setTimelineStartDate,
  setTimelineTaskStateFilter,
  setTimelineTaskStateOrder,
} from '../../store/actions/configuration.actions';
import {
  TableConfiguration,
  TimelineConfiguration,
} from '../../store/types/view-configuration.type';
import { ViewConfigurationService } from './view-configuration.service';

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

  it('#changeTimelineStartDate should dispatch set timeline start date action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const date = new Date('2023-10-01');
    const action = setTimelineStartDate({ startDate: date });

    service.changeTimelineStartDate(date);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#changeTimelineEndDate should dispatch set timeline end date action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const date = new Date('2023-10-02');
    const action = setTimelineEndDate({ endDate: date });

    service.changeTimelineEndDate(date);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#changeTimelineColumnSorting should dispatch change timeline column sorting action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const taskStatesInOrder = [new NotStartedTaskState(), new InProgressTaskState()];
    const action = setTimelineTaskStateOrder({ states: taskStatesInOrder });

    service.changeTimelineColumnSorting(taskStatesInOrder);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#changeTimelineFiltering should dispatch set timeline filtering action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const taskStatesToDisplay = [new NotStartedTaskState(), new InProgressTaskState()];
    const action = setTimelineTaskStateFilter({ states: taskStatesToDisplay });

    service.changeTimelineFiltering(taskStatesToDisplay);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#changeTableSorting should dispatch set table sort action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const sort: MatSortable = {
      id: 'id',
      start: 'asc',
      disableClear: true,
    };
    const action = setTableSort({ sort });

    service.changeTableSorting(sort);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
