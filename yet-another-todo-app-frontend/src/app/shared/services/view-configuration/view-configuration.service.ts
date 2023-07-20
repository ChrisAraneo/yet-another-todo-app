import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import {
  setTimelineEndDate,
  setTimelineStartDate,
} from '../../store/actions/configuration.actions';
import { ViewConfiguration } from '../../store/reducers/configuration.reducer';

@Injectable({
  providedIn: 'root',
})
export class ViewConfigurationService {
  private configuration!: BehaviorSubject<ViewConfiguration>;
  private subscription?: Subscription;

  constructor(public store: Store<{ viewConfiguration: ViewConfiguration }>) {
    this.initializeConfigurationBehaviorSubject();
  }

  getTimelineConfiguration(): Observable<{ startDate: Date; endDate: Date }> {
    return this.configuration.asObservable().pipe(map((config) => config.timeline));
  }

  changeTimelineStartDate(date: Date): void {
    this.store.dispatch(setTimelineStartDate({ startDate: date }));
  }

  changeTimelineEndDate(date: Date): void {
    this.store.dispatch(setTimelineEndDate({ endDate: date }));
  }

  private initializeConfigurationBehaviorSubject(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.store.select('viewConfiguration').subscribe((config) => {
      if (!this.configuration) {
        this.configuration = new BehaviorSubject(config);
      } else {
        this.configuration.next(config);
      }
    });
  }
}
