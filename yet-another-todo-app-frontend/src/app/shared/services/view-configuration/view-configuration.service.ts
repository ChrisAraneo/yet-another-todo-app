import { Injectable } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { TaskState } from '../../models/task-state.model';
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
  ViewConfiguration,
} from '../../store/types/view-configuration.type';

@Injectable({
  providedIn: 'root',
})
export class ViewConfigurationService {
  private configuration!: BehaviorSubject<ViewConfiguration>;
  private subscription?: Subscription;

  constructor(public store: Store<{ viewConfiguration: ViewConfiguration }>) {
    this.initializeConfigurationBehaviorSubject();
  }

  getTimelineConfiguration(): Observable<TimelineConfiguration> {
    return this.configuration.asObservable().pipe(map((config) => config.timeline));
  }

  getTableConfiguration(): Observable<TableConfiguration> {
    return this.configuration.asObservable().pipe(map((config) => config.table));
  }

  changeTimelineStartDate(date: Date): void {
    this.store.dispatch(setTimelineStartDate({ startDate: date }));
  }

  changeTimelineEndDate(date: Date): void {
    this.store.dispatch(setTimelineEndDate({ endDate: date }));
  }

  changeTimelineColumnSorting(taskStatesInOrder: TaskState[]): void {
    this.store.dispatch(setTimelineTaskStateOrder({ states: taskStatesInOrder }));
  }

  changeTimelineFiltering(taskStatesToDisplay: TaskState[]): void {
    this.store.dispatch(setTimelineTaskStateFilter({ states: taskStatesToDisplay }));
  }

  changeTableSorting(sort: MatSortable): void {
    this.store.dispatch(setTableSort({ sort }));
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
