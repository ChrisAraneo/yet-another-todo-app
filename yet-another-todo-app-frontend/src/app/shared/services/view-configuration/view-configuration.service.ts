import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setTimelineEndDate,
  setTimelineStartDate,
} from '../../store/actions/configuration.actions';
import { ViewConfiguration } from '../../store/reducers/configuration.reducer';

@Injectable({
  providedIn: 'root',
})
export class ViewConfigurationService {
  constructor(public store: Store<{ viewConfigurations: ViewConfiguration }>) {}

  changeTimelineStartDate(date: Date): void {
    this.store.dispatch(setTimelineStartDate({ startDate: date }));
  }

  changeTimelineEndDate(date: Date): void {
    this.store.dispatch(setTimelineEndDate({ endDate: date }));
  }
}
