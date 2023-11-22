import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription, debounceTime, map } from 'rxjs';
import { AppMode } from './app.types';
import { DialogService } from './modals/services/dialog/dialog.service';
import { DateUtilsService } from './shared/services/date-utils/date-utils.service';
import { UserService } from './shared/services/user/user.service';
import { ViewConfigurationService } from './shared/services/view-configuration/view-configuration.service';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, AfterViewInit {
  @ViewChild(TimelineComponent) timelineElementRef!: TimelineComponent;

  readonly timelineMode = AppMode.Timeline;
  readonly tableMode = AppMode.Table;

  appMode: AppMode = AppMode.Timeline;
  isMenuOpened: boolean = true;
  isAppVisible!: BehaviorSubject<boolean>;
  username!: Observable<string | null>;
  isOfflineMode!: Observable<boolean>;
  tableSort!: Observable<MatSortable>;

  private subscription!: Subscription;

  constructor(
    private translateService: TranslateService,
    private dateUtilsService: DateUtilsService,
    private userService: UserService,
    private dialogService: DialogService,
    private viewConfigurationService: ViewConfigurationService,
    private router: Router,
  ) {
    this.initializeTranslateService();
    this.initializeIsAppVisibleObservable();
    // this.initializeTimelineConfigurationObservables();
    this.initializeTableConfigurationObservables();
    this.initializeUsernameObservable();
    this.initializeIsOfflineModeObservable();
    this.subscribeToUserChanges();
  }

  ngAfterViewInit(): void {
    // TODO Fix centering timeline
    // this.centerTimelineScrollOnTodayColumn();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
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
    this.subscription = this.userService
      .getUserData()
      .pipe(debounceTime(200))
      .subscribe((state) => {
        if (!state.isLogged && !state.isOfflineMode) {
          this.isAppVisible.next(false);
          this.dialogService.openSignInModal();
        } else {
          this.isAppVisible.next(true);

          if (this.router.url === '/timeline') {
            // this.centerTimelineScrollOnTodayColumn(); // TODO
          }
        }
      });
  }

  // TODO Fix
  // private centerTimelineScrollOnTodayColumn(): void {
  //   this.timelineStartDate?.pipe(first()).subscribe((startDate) => {
  //     const element = this.timelineElementRef.elementRef.nativeElement;

  //     const offset = this.dateUtilsService.getNumberOfDaysBetweenDates(new Date(), startDate);
  //     const timelineContentMargin = UNIT;
  //     const elementClientWidth = element.clientWidth;
  //     const columnsInView = elementClientWidth / COLUMN_WIDTH;

  //     const scrollLeft =
  //       offset * COLUMN_WIDTH + timelineContentMargin - (columnsInView / 2) * COLUMN_WIDTH;

  //     element.scrollLeft = scrollLeft;
  //   });
  // }
}
