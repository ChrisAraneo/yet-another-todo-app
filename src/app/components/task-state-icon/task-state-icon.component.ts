import { Component, Input, OnInit } from '@angular/core';
import { TaskState } from 'src/app/shared/model/task-state.type';

@Component({
  selector: 'yata-task-state-icon',
  templateUrl: './task-state-icon.component.html',
  styleUrls: ['./task-state-icon.component.scss'],
})
export class TaskStateIconComponent implements OnInit {
  @Input() state: TaskState | null = null;

  states = {
    NotStarted: TaskState.NotStarted,
    InProgress: TaskState.InProgress,
    Finished: TaskState.Finished,
    Suspended: TaskState.Suspended,
    Rejected: TaskState.Rejected,
  };

  constructor() {}

  ngOnInit(): void {}
}
