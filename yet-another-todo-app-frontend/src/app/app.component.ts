import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSortable } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, debounceTime, first, map } from 'rxjs';
import { AppMode } from './app.types';
import { DialogService } from './modals/services/dialog/dialog.service';
import { TaskState } from './shared/models/task-state.model';
import { DateUtilsService } from './shared/services/date-utils/date-utils.service';
import { UserService } from './shared/services/user/user.service';
import { ViewConfigurationService } from './shared/services/view-configuration/view-configuration.service';
import { COLUMN_WIDTH, UNIT } from './shared/styles/theme';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, AfterViewInit {
  @ViewChild('timeline') timelineElementRef!: TimelineComponent;

  readonly timelineMode = AppMode.Timeline;
  readonly tableMode = AppMode.Table;

  appMode: AppMode = AppMode.Timeline;
  isAppVisible: boolean = false;
  isMenuOpened: boolean = true;
  timelineStartDate!: Observable<Date>;
  timelineEndDate!: Observable<Date>;
  timelineTasksStateSortOrder!: Observable<TaskState[]>;
  timelineTasksStateFilter!: Observable<TaskState[]>;
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
  ) {
    this.initializeTranslateService();
    this.initializeTimelineConfigurationObservables();
    this.initializeTableConfigurationObservables();
    this.initializeUsernameObservable();
    this.initializeIsOfflineModeObservable();
    this.subscribeToUserChanges();
  }

  ngAfterViewInit(): void {
    this.centerTimelineScrollOnTodayColumn();
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

  changeStartDate(startDate: Date): void {
    this.viewConfigurationService.changeTimelineStartDate(startDate);
  }

  changeEndDate(endDate: Date): void {
    this.viewConfigurationService.changeTimelineEndDate(endDate);
  }

  private initializeTranslateService(): void {
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang('en');

    const browserCultureLang = this.translateService.getBrowserCultureLang();

    this.translateService.use(browserCultureLang || 'en');
  }

  private initializeTimelineConfigurationObservables(): void {
    this.timelineStartDate = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.startDate));

    this.timelineEndDate = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.endDate));

    this.timelineTasksStateSortOrder = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.order));

    this.timelineTasksStateFilter = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.filter));
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
          this.isAppVisible = false;
          this.dialogService.openSignInModal();
        } else {
          this.isAppVisible = true;
        }
      });
  }

  private centerTimelineScrollOnTodayColumn(): void {
    this.timelineStartDate?.pipe(first()).subscribe((startDate) => {
      const element = this.timelineElementRef.elementRef.nativeElement;

      const offset = this.dateUtilsService.getNumberOfDaysBetweenDates(new Date(), startDate);
      const timelineContentMargin = UNIT;
      const elementClientWidth = element.clientWidth;
      const columnsInView = elementClientWidth / COLUMN_WIDTH;

      const scrollLeft =
        offset * COLUMN_WIDTH + timelineContentMargin - (columnsInView / 2) * COLUMN_WIDTH;

      element.scrollLeft = scrollLeft;
    });
  }
}
