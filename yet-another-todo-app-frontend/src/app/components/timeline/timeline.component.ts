import { Component, Input, OnInit } from '@angular/core';
import { InProgressTaskState } from 'src/app/models/task-state.model';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { StartedTask } from '../../models/task.model';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() startDate?: Date;
  @Input() endDate?: Date;

  headers: string[] = [];

  // TODO for test purposes
  tasks: StartedTask[] = [
    new StartedTask('Lorem ipsum', 'Dolor es', new InProgressTaskState(), new Date(2023, 0, 16)),
  ];

  constructor(private dateUtils: DateUtilsService) {}

  ngOnInit(): void {
    this.headers = this.dateUtils
      .getAllDaysInMonth(this.startDate ? this.startDate : new Date())
      .map((date) => this.dateUtils.formatDate(date, 'dd-MM-yyyy'));
  }
}
