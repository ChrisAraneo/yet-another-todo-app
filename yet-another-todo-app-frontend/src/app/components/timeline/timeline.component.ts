import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { StartedTask } from '../../models/task.model';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() startDate?: Date;
  @Input() endDate?: Date;

  @Output() changeStartDate = new EventEmitter<Date>();
  @Output() changeEndDate = new EventEmitter<Date>();

  tasks!: Observable<StartedTask[]>;
  headers: string[] = [];

  constructor(private tasksService: TasksService, private dateUtils: DateUtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentStartDate = changes['startDate'] && changes['startDate'].currentValue;
    const previousStartDate = changes['startDate'] && changes['startDate'].previousValue;
    const currentEndDate = changes['endDate'] && changes['endDate'].currentValue;
    const previousEndDate = changes['endDate'] && changes['endDate'].previousValue;

    if (+currentStartDate !== +previousStartDate || +currentEndDate !== +previousEndDate) {
      this.updateTimelineHeaders(currentStartDate, currentEndDate);
    }
  }

  ngOnInit(): void {
    this.tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => tasks.filter((task) => task instanceof StartedTask) as StartedTask[]));
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

  private updateTimelineHeaders(startDate?: Date, endDate?: Date): void {
    this.headers = this.dateUtils
      .getAllDaysInPeriodOfTime(startDate ? startDate : new Date(), endDate ? endDate : new Date())
      .map((date) => this.dateUtils.formatDate(date, 'dd-MM-yyyy'));
  }
}
