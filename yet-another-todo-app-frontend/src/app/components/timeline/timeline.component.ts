import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { UNIT } from 'src/app/shared/theme';
import { StartedTask } from '../../models/task.model';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnChanges, AfterViewInit {
  @Input() startDate?: Date;
  @Input() endDate?: Date;

  @Output() changeStartDate = new EventEmitter<Date>();
  @Output() changeEndDate = new EventEmitter<Date>();

  tasks!: Observable<StartedTask[]>;
  headers: string[] = [];
  previousMonthButtonPosition = {
    left: '0px',
    top: '0px',
  };
  nextMonthButtonPosition = {
    left: '0px',
    top: '0px',
  };

  constructor(
    private elementRef: ElementRef,
    private tasksService: TasksService,
    private dateUtils: DateUtilsService,
  ) {
    window.addEventListener('resize', () => {
      this.updateButtonsPosition(this.elementRef.nativeElement.getBoundingClientRect());
    });
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
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateButtonsPosition(this.elementRef.nativeElement.getBoundingClientRect());
    }, 0);
  }

  changeStartDateToPreviousMonth() {
    const firstDayOfPreviousMonth = this.dateUtils.getFirstDayOfThePreviousMonth(
      this.startDate as Date,
    );

    this.changeStartDate.next(firstDayOfPreviousMonth);
    this.changeEndDate.next(this.dateUtils.getLastDayOfTheMonth(firstDayOfPreviousMonth));
  }

  changeStartDateToNextMonth() {
    const firstDayOfNextMonth = this.dateUtils.getFirstDayOfTheNextMonth(this.startDate as Date);

    this.changeStartDate.next(firstDayOfNextMonth);
    this.changeEndDate.next(this.dateUtils.getLastDayOfTheMonth(firstDayOfNextMonth));
  }

  private updateTasks(startDate?: Date, endDate?: Date): void {
    if (+(startDate || 0) > +(endDate || 0)) {
      this.tasks = of([]);
      return;
    }

    this.tasks = this.tasksService.getTasks().pipe(
      map((tasks) => {
        const startedTasks: StartedTask[] = tasks.filter(
          (task) => task instanceof StartedTask,
        ) as StartedTask[];
        const tasksInSelectedPeriod = startedTasks.filter(
          (task) =>
            +task.getStartDate() >= +(startDate || 0) && +task.getStartDate() <= +(endDate || -1),
        );

        return tasksInSelectedPeriod;
      }),
    );
  }

  private updateTimelineHeaders(startDate?: Date, endDate?: Date): void {
    if (+(startDate || 0) > +(endDate || 0)) {
      this.headers = [];
      return;
    }

    this.headers = this.dateUtils
      .getAllDaysInPeriodOfTime(startDate ? startDate : new Date(), endDate ? endDate : new Date())
      .map((date) => this.dateUtils.formatDate(date, 'dd-MM-yyyy'));
  }

  private updateButtonsPosition(rect: any): void {
    if (this.previousMonthButtonPosition.left !== `${rect.x}px`) {
      this.previousMonthButtonPosition.left = `${rect.x}px`;
    }
    if (this.previousMonthButtonPosition.top !== `${rect.y}px`) {
      this.previousMonthButtonPosition.top = `${rect.y}px`;
    }
    if (this.nextMonthButtonPosition.left !== `${rect.x + rect.width - UNIT}px`) {
      this.nextMonthButtonPosition.left = `${rect.x + rect.width - UNIT}px`;
    }
    if (this.nextMonthButtonPosition.top !== `${rect.y}px`) {
      this.nextMonthButtonPosition.top = `${rect.y}px`;
    }
  }
}
