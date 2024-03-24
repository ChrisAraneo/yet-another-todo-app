import { Injectable, OnDestroy } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, first, map, timer } from 'rxjs';
import { TABLE_PATH, TIMELINE_PATH } from 'src/app/app-routing.consts';
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
export class ViewConfigurationService implements OnDestroy {
  private configuration!: BehaviorSubject<ViewConfiguration>;
  private subscription: Subscription = new Subscription();

  constructor(
    public store: Store<{ viewConfiguration: ViewConfiguration }>,
    private router: Router,
  ) {
    this.initializeConfigurationSubject();
    this.subscribeToUrlChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAppMode(): Observable<AppMode> {
    return this.configuration.pipe(map((config) => config.mode));
  }

  getTimelineConfiguration(): Observable<TimelineConfiguration> {
    return this.configuration.pipe(map((config) => config.timeline));
  }

  getTableConfiguration(): Observable<TableConfiguration> {
    return this.configuration.pipe(map((config) => config.table));
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

    this.subscription.add(subscription);
  }

  private subscribeToUrlChanges(): void {
    const initialUrlSubscription = timer(200)
      .pipe(first())
      .subscribe(() => {
        this.changeAppModeBasedOnUrl(this.router.routerState.snapshot.url);
      });

    const eventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeAppModeBasedOnUrl(event.urlAfterRedirects || event.url);
      } else if (event instanceof NavigationSkipped) {
        this.changeAppModeBasedOnUrl(event.url);
      }
    });

    this.subscription.add(initialUrlSubscription);
    this.subscription.add(eventsSubscription);
  }

  private changeAppModeBasedOnUrl(url: string): void {
    const urlParts = url.split('/').filter((part) => !!part);

    if (urlParts.length && (urlParts[0] === TIMELINE_PATH || urlParts[0] === TABLE_PATH)) {
      this.changeAppMode(urlParts[0] === TIMELINE_PATH ? AppMode.Timeline : AppMode.Table);
    } else {
      console.warn('Undefined app mode');
      this.changeAppMode(AppMode.Undefined);
    }
  }
}
