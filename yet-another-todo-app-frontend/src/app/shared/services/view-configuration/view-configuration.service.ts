import { Injectable } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { TaskState } from '../../models/task-state.model';
import {
  setAppMode,
  setTableSort,
  setTimelineEndDate,
  setTimelineStartDate,
  setTimelineTaskStateFilter,
  setTimelineTaskStateOrder,
} from '../../store/actions/configuration.actions';
import {
  AppMode,
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

  constructor(
    public store: Store<{ viewConfiguration: ViewConfiguration }>,
    private router: Router,
  ) {
    this.initializeConfigurationSubject();
    this.subscribeToUrlChanges();
  }

  getAppMode(): Observable<AppMode> {
    return this.configuration.asObservable().pipe(map((config) => config.mode));
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

  protected changeAppMode(mode: AppMode): void {
    this.store.dispatch(setAppMode({ mode }));
  }

  private initializeConfigurationSubject(): void {
    const subscription = this.store.select('viewConfiguration').subscribe((config) => {
      if (!this.configuration) {
        this.configuration = new BehaviorSubject(config);
      } else {
        this.configuration.next(config);
      }
    });

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.add(subscription);
    }
  }

  private subscribeToUrlChanges(): void {
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlPart = event.url.split('/').filter((part) => !!part)[0];

        if (urlPart === 'timeline' || urlPart === 'table') {
          this.changeAppMode(urlPart === 'timeline' ? AppMode.Timeline : AppMode.Table);
        } else {
          console.warn('Undefined app mode');
          this.changeAppMode(AppMode.Undefined);
        }
      }
    });

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.add(subscription);
    }
  }
}
