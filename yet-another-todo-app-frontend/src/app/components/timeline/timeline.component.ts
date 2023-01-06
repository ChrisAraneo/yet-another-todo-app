import { Component, Input, OnInit } from '@angular/core';
import {
  TaskCompleted,
  TaskInProgress,
  TaskNotStarted,
  TaskRejected,
  TaskSuspended,
} from 'src/app/models/task-state.model';
import { DateUtilsService } from 'src/app/services/date-utils.service';
import { Task } from '../../models/task.type';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() startDate?: Date;
  @Input() endDate?: Date;

  headers: string[] = [];

  tasks: Task[] = [
    {
      title: '456789',
      description: 'Lorem ipsum dolor',
      startDate: new Date(2023, 0, 7),
      endDate: null,
      state: new TaskNotStarted(),
    },
    {
      title: 'Lorem ipsum',
      description: 'Lorem ipsum componentum',
      startDate: new Date(2023, 0, 3),
      endDate: null,
      state: new TaskNotStarted(),
    },
    {
      title: 'Test',
      description: 'Lorem ipsum componentum',
      startDate: new Date(2023, 0, 3),
      endDate: null,
      state: new TaskNotStarted(),
    },
    {
      title: 'Test abcdef',
      description: 'Lorem ipsum dolor',
      startDate: new Date(2023, 0, 5),
      endDate: null,
      state: new TaskNotStarted(),
    },
    {
      title: 'One',
      description: 'Lorem ipsum dolor',
      startDate: new Date(2023, 0, 5),
      endDate: null,
      state: new TaskInProgress(),
    },
    {
      title: 'Two',
      description: 'Lorem ipsum dolor',
      startDate: new Date(2023, 0, 5),
      endDate: null,
      state: new TaskCompleted(),
    },
    {
      title: 'Three',
      description: 'Lorem ipsum dolor',
      startDate: new Date(2023, 0, 5),
      endDate: null,
      state: new TaskRejected(),
    },
    {
      title: 'Quatro',
      description: 'Lorem ipsum dolor',
      startDate: new Date(2023, 0, 5),
      endDate: null,
      state: new TaskSuspended(),
    },
    {
      title: '111 111 111',
      description: 'Lorem ipsum dolor',
      startDate: new Date(2023, 0, 8),
      endDate: null,
      state: new TaskNotStarted(),
    },
  ];

  constructor(private dateUtils: DateUtilsService) {}

  ngOnInit(): void {
    this.headers = this.dateUtils
      .getAllDaysInMonth(this.startDate ? this.startDate : new Date())
      .map((date) => this.dateUtils.formatDate(date, 'dd-MM-yyyy'));
  }
}
