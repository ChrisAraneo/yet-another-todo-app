import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { UNIT } from 'src/app/shared/styles/theme.__generated';
import { Task, TaskState } from '../../../../../../yet-another-todo-app-shared';
import { ElementPosition, Rect, TimelineHeader } from './timeline.types';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly today = new Date();

  startDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);
  endDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);
  tasksStateSortOrder!: Observable<TaskState[]>;
  tasksStateFilter!: Observable<TaskState[]>;

  tasks!: Observable<Task[]>;
  headers: TimelineHeader[] = [];
  previousMonthButtonPosition!: ElementPosition;
  nextMonthButtonPosition!: ElementPosition;
  columnHighlightHeight: string = '0px';

  private observer!: ResizeObserver;
  private subscription?: Subscription;

  constructor(
    public elementRef: ElementRef,
    private tasksService: TasksService,
    private viewConfigurationService: ViewConfigurationService,
    private dateUtils: DateUtilsService,
    private zone: NgZone,
  ) {
    this.initializeButtons();
    this.addWindowResizeListener();
  }

  ngOnInit(): void {
    this.initializeSubjects();
    this.initializeObservables();
    this.subscribeToConfigurationChanges();
    this.initializeResizeObserver();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateButtonsPosition(this.elementRef.nativeElement.getBoundingClientRect());
    }, 0);
  }

  ngOnDestroy(): void {
    this.observer && this.observer.unobserve(this.elementRef.nativeElement);
  }

  update(startDate?: Date, endDate?: Date): void {
    const daysInPeriodOfTime: number =
      startDate && endDate
        ? this.dateUtils.getNumberOfDaysBetweenDates(startDate, endDate)
        : Number.NaN;

    if (!isNaN(daysInPeriodOfTime) && daysInPeriodOfTime > 10 * 365) {
      throw Error('Selected too many days to display on the timeline');
    }

    // TODO What in case of NaN?

    this.updateTasks(startDate, endDate);
    this.updateTimelineHeaders(startDate, endDate);
    this.updateColumnHighlightHeight();
  }

  changeStartDate(startDate: Date): void {
    this.viewConfigurationService.changeTimelineStartDate(startDate);
  }

  changeEndDate(endDate: Date): void {
    this.viewConfigurationService.changeTimelineEndDate(endDate);
  }

  changeStartDateToPreviousMonth(): void {
    const startDate = this.startDate.getValue();

    if (startDate instanceof Date) {
      const firstDayOfPreviousMonth = this.dateUtils.getFirstDayOfThePreviousMonth(startDate);

      this.changeStartDate(firstDayOfPreviousMonth);
      this.changeEndDate(this.dateUtils.getLastDayOfTheMonth(firstDayOfPreviousMonth));
    }
  }

  changeStartDateToNextMonth(): void {
    const startDate = this.startDate.getValue();

    if (startDate instanceof Date) {
      const firstDayOfNextMonth = this.dateUtils.getFirstDayOfTheNextMonth(startDate);

      this.changeStartDate(firstDayOfNextMonth);
      this.changeEndDate(this.dateUtils.getLastDayOfTheMonth(firstDayOfNextMonth));
    }
  }

  private initializeSubjects(): void {
    this.startDate = new BehaviorSubject<Date | null>(null);
    this.endDate = new BehaviorSubject<Date | null>(null);
  }

  private initializeObservables(): void {
    this.tasksStateSortOrder = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.order));

    this.tasksStateFilter = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.filter));
  }

  private subscribeToConfigurationChanges(): void {
    const startDateChangesSubscription = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.startDate))
      .subscribe((startDate) => {
        this.startDate.next(startDate);

        const endDate = this.endDate?.getValue();
        this.update(startDate, endDate || undefined);
      });

    const endDateChangesSubscription = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.endDate))
      .subscribe((endDate) => {
        this.endDate.next(endDate);

        const startDate = this.startDate?.getValue();
        this.update(startDate || undefined, endDate);
      });

    if (!this.subscription) {
      this.subscription = startDateChangesSubscription;
      this.subscription.add(endDateChangesSubscription);
    } else {
      this.subscription.unsubscribe();
      this.subscription.add(startDateChangesSubscription);
      this.subscription.add(endDateChangesSubscription);
    }
  }

  private initializeButtons(): void {
    this.previousMonthButtonPosition = {
      left: '0px',
      top: '0px',
    };
    this.nextMonthButtonPosition = {
      left: '0px',
      top: '0px',
    };
  }

  private updateColumnHighlightHeight(): void {
    this.columnHighlightHeight = this.elementRef?.nativeElement
      ? `${this.elementRef.nativeElement.clientHeight + 1}px`
      : '0';
  }

  private initializeResizeObserver(): void {
    this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.zone.run(() => {
        const target = entries[0].target as any;
        const contentRect = entries[0].contentRect;

        this.updateButtonsPosition({
          x: target?.offsetLeft,
          y: target?.offsetTop,
          width: contentRect.width,
          height: contentRect.height,
        });
        this.updateColumnHighlightHeight();
      });
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  private addWindowResizeListener(): void {
    window.addEventListener('resize', () => {
      this.updateButtonsPosition(this.elementRef.nativeElement.getBoundingClientRect());
    });
  }

  private updateTasks(startDate?: Date, endDate?: Date): void {
    if (+(startDate || 0) > +(endDate || 0)) {
      this.tasks = of([]);
      return;
    }

    this.tasks = this.tasksService.getTasks();
  }

  private updateTimelineHeaders(startDate?: Date, endDate?: Date): void {
    if (+(startDate || 0) > +(endDate || 0)) {
      this.headers = [];
      return;
    }

    const dates = this.dateUtils.getAllDaysInPeriodOfTime(
      startDate ? startDate : new Date(),
      endDate ? endDate : new Date(),
    );

    this.headers = dates.map((date: Date) => ({
      date: this.dateUtils.formatDate(date, 'dd-MM-yyyy'),
      dayOfWeek: this.capitalizeFirstLetter(this.dateUtils.formatDate(date, 'EEEE')),
    }));
  }

  private updateButtonsPosition(rect: Rect): void {
    this.updateButtonPosition(this.previousMonthButtonPosition, rect.x, rect.y);
    this.updateButtonPosition(this.nextMonthButtonPosition, rect.x + rect.width - UNIT, rect.y);
  }

  private updateButtonPosition(button: ElementPosition, x: number, y: number): void {
    button['left'] !== `${x}px` && (button.left = `${x}px`);
    button['top'] !== `${y}px` && (button.top = `${y}px`);
  }

  // TODO Move to pipe
  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
