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

  tasks!: Observable<StartedTask[]>;
  headers: string[] = [];

  constructor(private tasksService: TasksService, private dateUtils: DateUtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentStartDate = changes['startDate'] && changes['startDate'].currentValue;
    const previousStartDate = changes['startDate'] && changes['startDate'].previousValue;
    const currentEndDate = changes['endDate'] && changes['endDate'].currentValue;
    const previousEndDate = changes['endDate'] && changes['endDate'].previousValue;

    if (+currentStartDate !== +previousStartDate || +currentEndDate !== +previousEndDate) {
      this.updateHeaders(currentStartDate);
    }
  }

  ngOnInit(): void {
    this.tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => tasks.filter((task) => task instanceof StartedTask) as StartedTask[]));
  }

  changeStartDateToPreviousMonth() {
    this.changeStartDate.next(this.dateUtils.getFirstDayOfThePreviousMonth(this.startDate as Date));
  }

  changeStartDateToNextMonth() {
    this.changeStartDate.next(this.dateUtils.getFirstDayOfTheNextMonth(this.startDate as Date));
  }

  // TODO Support for custom start-end periods, not only one month
  private updateHeaders(startDate?: Date): void {
    this.headers = this.dateUtils
      .getAllDaysInMonth(startDate ? startDate : new Date())
      .map((date) => this.dateUtils.formatDate(date, 'dd-MM-yyyy'));
  }
}
