import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { StartedTask } from '../../models/task.model';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnChanges {
  @Input() startDate?: Date;
  @Input() endDate?: Date;

  @Output() changeStartDate = new EventEmitter<Date>();
  @Output() changeEndDate = new EventEmitter<Date>();

  tasks!: Observable<StartedTask[]>;
  headers: string[] = [];

  constructor(private tasksService: TasksService, private dateUtils: DateUtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentStartDate =
      (changes['startDate'] && changes['startDate'].currentValue) || this.startDate;
    const previousStartDate = changes['startDate'] && changes['startDate'].previousValue;

    const currentEndDate = (changes['endDate'] && changes['endDate'].currentValue) || this.endDate;
    const previousEndDate = changes['endDate'] && changes['endDate'].previousValue;

    if (+currentStartDate !== +previousStartDate || +currentEndDate !== +previousEndDate) {
      const daysInPeriodOfTime = this.dateUtils.getDifferenceInDays(
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
}
