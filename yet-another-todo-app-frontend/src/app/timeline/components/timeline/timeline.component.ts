import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskState } from 'src/app/shared/models/task-state.model';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { UNIT } from 'src/app/shared/styles/theme';
import { Task } from '../../../shared/models/task.model';
import { ElementPosition, Rect, TimelineHeader } from './timeline.types';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() tasksStateSortOrder: TaskState[] = [];
  @Input() tasksStateFilter: TaskState[] = [];

  @Output() changeStartDate = new EventEmitter<Date>();
  @Output() changeEndDate = new EventEmitter<Date>();

  readonly today = new Date();

  tasks!: Observable<Task[]>;
  headers: TimelineHeader[] = [];
  previousMonthButtonPosition!: ElementPosition;
  nextMonthButtonPosition!: ElementPosition;
  columnHighlightHeight: string = '0px';

  private observer!: ResizeObserver;

  constructor(
    public elementRef: ElementRef,
    private tasksService: TasksService,
    private dateUtils: DateUtilsService,
    private zone: NgZone,
  ) {
    this.initializeButtons();
    this.addWindowResizeListener();
  }

  ngOnInit(): void {
    this.initializeResizeObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentStartDate =
      (changes['startDate'] && changes['startDate'].currentValue) || this.startDate;
    const previousStartDate = changes['startDate'] && changes['startDate'].previousValue;

    const currentEndDate = (changes['endDate'] && changes['endDate'].currentValue) || this.endDate;
    const previousEndDate = changes['endDate'] && changes['endDate'].previousValue;

    if (+currentStartDate !== +previousStartDate || +currentEndDate !== +previousEndDate) {
      const daysInPeriodOfTime = this.dateUtils.getNumberOfDaysBetweenDates(
        currentStartDate,
        currentEndDate,
      );

      if (daysInPeriodOfTime > 10 * 365) {
        // TODO Handle too many days selected
        return;
      }

      this.updateTasks(currentStartDate, currentEndDate);
      this.updateTimelineHeaders(currentStartDate, currentEndDate);
      this.updateColumnHighlightHeight();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateButtonsPosition(this.elementRef.nativeElement.getBoundingClientRect());
    }, 0);
  }

  ngOnDestroy(): void {
    this.observer && this.observer.unobserve(this.elementRef.nativeElement);
  }

  changeStartDateToPreviousMonth(): void {
    const firstDayOfPreviousMonth = this.dateUtils.getFirstDayOfThePreviousMonth(
      this.startDate as Date,
    );

    this.changeStartDate.next(firstDayOfPreviousMonth);
    this.changeEndDate.next(this.dateUtils.getLastDayOfTheMonth(firstDayOfPreviousMonth));
  }

  changeStartDateToNextMonth(): void {
    const firstDayOfNextMonth = this.dateUtils.getFirstDayOfTheNextMonth(this.startDate as Date);

    this.changeStartDate.next(firstDayOfNextMonth);
    this.changeEndDate.next(this.dateUtils.getLastDayOfTheMonth(firstDayOfNextMonth));
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
