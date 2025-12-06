import { Component, ElementRef, OnDestroy } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  debounceTime,
  map,
  mergeMap,
  tap,
} from 'rxjs';
import { DateUtilsService } from './shared/services/date-utils/date-utils.service';
import { UserService } from './shared/services/user/user.service';
import { ViewConfigurationService } from './shared/services/view-configuration/view-configuration.service';
import { CurrentUser } from './shared/store/types/current-user.type';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';
import { FooterComponent } from './container/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ToolbarComponent } from './container/components/toolbar/toolbar.component';
import { SideNavigationComponent } from './side-navigation/components/side-navigation/side-navigation.component';
import { AppWrapperComponent } from './container/components/app-wrapper/app-wrapper.component';
import { UNIT, COLUMN_WIDTH } from './shared/styles/theme.__generated';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppWrapperComponent,
    AsyncPipe,
    FooterComponent,
    RouterOutlet,
    SideNavigationComponent,
    ToolbarComponent,
    TranslatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isMenuOpened = true;
  isAppVisible!: BehaviorSubject<boolean>;
  isOfflineMode!: Observable<boolean>;
  username!: Observable<string | null>;
  timelineElementRef: ElementRef | null = null;

  private centerTimeline = new BehaviorSubject<void>(undefined);
  private subscription?: Subscription;

  constructor(
    private translateService: TranslateService,
    private dateUtilsService: DateUtilsService,
    private userService: UserService,
    private viewConfigurationService: ViewConfigurationService,
    // private primeNgConfig: PrimeNGConfig, // TODO
  ) {
    this.initializeTranslateService();
    this.initializeIsAppVisibleObservable();
    this.initializeUsernameObservable();
    this.initializeIsOfflineModeObservable();
    this.subscribeToUserChanges();
    this.subscribeToCenterTimeline();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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

  private initializeTranslateService(): void {
    this.translateService.addLangs(['en', 'pl']);
    this.translateService.setDefaultLang('en');

    const browserCultureLang = this.translateService.getBrowserCultureLang();

    this.translateService.use(browserCultureLang || 'en');

    // this.translateService
    //   .get('PrimeNG')
    //   ?.pipe(first())
    //   .subscribe((result) => {
    //     this.primeNgConfig.setTranslation(result);
    //   });
  }

  private initializeIsAppVisibleObservable(): void {
    this.isAppVisible = new BehaviorSubject(false);
  }

  private initializeUsernameObservable(): void {
    this.username = this.userService.getUsername();
  }

  private initializeIsOfflineModeObservable(): void {
    this.isOfflineMode = this.userService.getIsOfflineMode();
  }

  private subscribeToUserChanges(): void {
    if (!this.subscription) {
      this.subscription = new Subscription();
    }

    this.subscription.add(
      this.userService
        .getUserData()
        .pipe(
          debounceTime(100),
          tap((currentUser: CurrentUser) => {
            if (!currentUser.isLogged && !currentUser.isOfflineMode) {
              this.isAppVisible.next(false);
            } else {
              this.isAppVisible.next(true);
              this.centerTimeline.next();
            }
          }),
        )
        .subscribe(),
    );
  }

  private subscribeToCenterTimeline(): void {
    if (!this.subscription) {
      this.subscription = new Subscription();
    }

    this.subscription.add(
      this.centerTimeline
        .asObservable()
        .pipe(
          debounceTime(10),
          mergeMap(() => this.centerTimelineScrollOnTodayColumn()),
        )
        .subscribe(),
    );
  }

  private centerTimelineScrollOnTodayColumn(): Observable<void> {
    return this.viewConfigurationService.getTimelineConfiguration().pipe(
      map((config) => config.startDate),
      tap((startDate: Date) => {
        const element = this.timelineElementRef?.nativeElement;

        if (element) {
          const offset = this.dateUtilsService.getNumberOfDaysBetweenDates(
            new Date(),
            startDate,
          );
          const timelineContentMargin = UNIT;
          const elementClientWidth = element.clientWidth;
          const columnsInView = elementClientWidth / COLUMN_WIDTH;

          const scrollLeft =
            offset * COLUMN_WIDTH +
            timelineContentMargin -
            (columnsInView / 2) * COLUMN_WIDTH;

          element.scrollLeft = scrollLeft;
        }
      }),
      map(() => {
        return;
      }),
    );
  }
}
