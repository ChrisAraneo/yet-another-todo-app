import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { StartedTask } from '../../models/task.model';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() startDate?: Date;
  @Input() endDate?: Date;

  tasks!: Observable<StartedTask[]>;
  headers: string[] = [];

  constructor(private tasksService: TasksService, private dateUtils: DateUtilsService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => tasks.filter((task) => task instanceof StartedTask) as StartedTask[]));

    this.headers = this.dateUtils
      .getAllDaysInMonth(this.startDate ? this.startDate : new Date())
      .map((date) => this.dateUtils.formatDate(date, 'dd-MM-yyyy'));
  }
}
