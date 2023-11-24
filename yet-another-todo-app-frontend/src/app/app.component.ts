import { Component, ElementRef, OnDestroy } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription, debounceTime, map, mergeMap, tap } from 'rxjs';
import { AppMode } from './app.types';
import { DialogService } from './modals/services/dialog/dialog.service';
import { DateUtilsService } from './shared/services/date-utils/date-utils.service';
import { UserService } from './shared/services/user/user.service';
import { ViewConfigurationService } from './shared/services/view-configuration/view-configuration.service';
import { CurrentUser } from './shared/store/types/current-user.type';
import { COLUMN_WIDTH, UNIT } from './shared/styles/theme';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  readonly timelineMode = AppMode.Timeline;
  readonly tableMode = AppMode.Table;

  appMode: AppMode = AppMode.Timeline;
  isMenuOpened: boolean = true;
  isAppVisible!: BehaviorSubject<boolean>;
  isOfflineMode!: Observable<boolean>;
  username!: Observable<string | null>;
  tableSort!: Observable<MatSortable>;
  timelineElementRef: ElementRef | null = null;

  private subscription!: Subscription;

  constructor(
    private translateService: TranslateService,
    private dateUtilsService: DateUtilsService,
    private userService: UserService,
    private dialogService: DialogService,
    private viewConfigurationService: ViewConfigurationService,
  ) {
    this.initializeTranslateService();
    this.initializeIsAppVisibleObservable();
    this.initializeTableConfigurationObservables();
    this.initializeUsernameObservable();
    this.initializeIsOfflineModeObservable();
    this.subscribeToUserChanges();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  onRouterOutletActivated(component: TimelineComponent | unknown): void {
    if (component instanceof TimelineComponent) {
      this.timelineElementRef = component.elementRef;

      this.centerTimelineScrollOnTodayColumn();
    } else {
      this.timelineElementRef = null;
    }
  }

  onMenuClick(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  changeAppMode(mode: AppMode): void {
    this.appMode = mode;
  }

  private initializeTranslateService(): void {
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang('en');

    const browserCultureLang = this.translateService.getBrowserCultureLang();

    this.translateService.use(browserCultureLang || 'en');
  }

  private initializeIsAppVisibleObservable(): void {
    this.isAppVisible = new BehaviorSubject(false);
  }

  private initializeTableConfigurationObservables(): void {
    this.tableSort = this.viewConfigurationService
      .getTableConfiguration()
      .pipe(map((config) => config.sort));
  }

  private initializeUsernameObservable(): void {
    this.username = this.userService.getUsername();
  }

  private initializeIsOfflineModeObservable(): void {
    this.isOfflineMode = this.userService.getIsOfflineMode();
  }

  private subscribeToUserChanges(): void {
    const subscription = this.userService
      .getUserData()
      .pipe(
        debounceTime(100),
        tap((currentUser: CurrentUser) => {
          if (!currentUser.isLogged && !currentUser.isOfflineMode) {
            this.isAppVisible.next(false);
            this.dialogService.openSignInModal();
          } else {
            this.isAppVisible.next(true);
          }
        }),
        mergeMap(() => this.centerTimelineScrollOnTodayColumn()),
      )
      .subscribe();

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.unsubscribe();
      this.subscription.add(subscription);
    }
  }

  private centerTimelineScrollOnTodayColumn(): Observable<void> {
    return this.viewConfigurationService.getTimelineConfiguration().pipe(
      map((config) => config.startDate),
      tap((startDate: Date) => {
        const element = this.timelineElementRef?.nativeElement;

        if (element) {
          const offset = this.dateUtilsService.getNumberOfDaysBetweenDates(new Date(), startDate);
          const timelineContentMargin = UNIT;
          const elementClientWidth = element.clientWidth;
          const columnsInView = elementClientWidth / COLUMN_WIDTH;

          const scrollLeft =
            offset * COLUMN_WIDTH + timelineContentMargin - (columnsInView / 2) * COLUMN_WIDTH;

          element.scrollLeft = scrollLeft;
        }
      }),
      map(() => {
        return;
      }),
    );
  }
}
