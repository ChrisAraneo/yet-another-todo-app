import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, debounceTime } from 'rxjs';
import { AppMode } from './app.types';
import { DialogService } from './modals/services/dialog/dialog.service';
import { DateUtilsService } from './shared/services/date-utils/date-utils.service';
import { UserService } from './shared/services/user/user.service';
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
  timelineStartDate!: Date;
  timelineEndDate!: Date;
  username!: Observable<string | null>;
  isOfflineMode!: Observable<boolean>;

  private subscription!: Subscription;

  constructor(
    private translateService: TranslateService,
    private dateUtilsService: DateUtilsService,
    private userService: UserService,
    private dialogService: DialogService,
  ) {
    this.initializeTranslateService();
    this.initializeTimelineStartDate();
    this.initializeTimelineEndDate();
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
    this.timelineStartDate = startDate;
  }

  changeEndDate(endDate: Date): void {
    this.timelineEndDate = endDate;
  }

  private initializeTranslateService(): void {
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang('en');

    const browserCultureLang = this.translateService.getBrowserCultureLang();

    this.translateService.use(browserCultureLang || 'en');
  }

  private initializeTimelineStartDate(): void {
    const today = new Date();

    this.timelineStartDate = this.dateUtilsService.getFirstDayOfTheMonth(today);
  }

  private initializeTimelineEndDate(): void {
    const today = new Date();

    this.timelineEndDate = this.dateUtilsService.getLastDayOfTheMonth(today);
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
    const element = this.timelineElementRef.elementRef.nativeElement;

    const offset = this.dateUtilsService.getNumberOfDaysBetweenDates(
      new Date(),
      this.timelineStartDate,
    );
    const timelineContentMargin = 6 * UNIT;
    const elementClientWidth = element.clientWidth;
    const columnsInView = elementClientWidth / COLUMN_WIDTH;

    const scrollLeft =
      offset * COLUMN_WIDTH + timelineContentMargin - (Math.ceil(columnsInView) / 2) * COLUMN_WIDTH;

    element.scrollLeft = scrollLeft;
  }
}
