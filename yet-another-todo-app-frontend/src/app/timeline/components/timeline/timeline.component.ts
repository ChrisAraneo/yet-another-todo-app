import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { UNIT } from 'src/app/shared/styles/theme';
import { TaskState } from '../../../shared/models/task-state.model';
import { Task } from '../../../shared/models/task.model';
import { ElementPosition, Rect, TimelineHeader } from './timeline.types';
// import { TaskState } from '../../../shared/models/task-state.model';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly today = new Date();

  startDate!: BehaviorSubject<Date | null>;
  endDate!: BehaviorSubject<Date | null>;
  tasksStateSortOrder!: Observable<TaskState[]>;
  tasksStateFilter!: Observable<TaskState[]>;

  tasks!: Observable<Task[]>;
  headers: TimelineHeader[] = [];
  previousMonthButtonPosition!: ElementPosition;
  nextMonthButtonPosition!: ElementPosition;
  columnHighlightHeight: string = '0px';

  private observer!: ResizeObserver;
  private subscription: Subscription = new Subscription();

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
    // TODO Refactoring, cleaner code
    this.startDate = new BehaviorSubject<Date | null>(null);

    this.subscription.add(
      this.viewConfigurationService
        .getTimelineConfiguration()
        .pipe(map((config) => config.startDate))
        .subscribe((startDate) => {
          this.startDate.next(startDate);

          const endDate = this.endDate?.getValue();
          this.update(startDate, endDate || undefined);
        }),
    );

    // TODO Refactoring, cleaner code
    this.endDate = new BehaviorSubject<Date | null>(null);

    this.subscription.add(
      this.viewConfigurationService
        .getTimelineConfiguration()
        .pipe(map((config) => config.endDate))
        .subscribe((endDate) => {
          this.endDate.next(endDate);

          const startDate = this.startDate?.getValue();
          this.update(startDate || undefined, endDate);
        }),
    );

    // TODO Refactoring, cleaner code
    this.tasksStateSortOrder = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.order));

    // TODO Refactoring, cleaner code
    this.tasksStateFilter = this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(map((config) => config.filter));

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
    // TODO Handle too many days selected
    // const daysInPeriodOfTime = this.dateUtils.getNumberOfDaysBetweenDates(startDate, endDate);

    // if (daysInPeriodOfTime > 10 * 365) {
    // TODO Handle too many days selected
    // return;
    // }

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

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
