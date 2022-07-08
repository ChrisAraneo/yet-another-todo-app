import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskState } from 'src/app/shared/model/task-state.enum';

type TaskStateIconData = {
  icon: string;
  class: string;
  description: string;
};

@Component({
  selector: 'yata-task-state-icon',
  templateUrl: './task-state-icon.component.html',
  styleUrls: ['./task-state-icon.component.scss'],
})
export class TaskStateIconComponent implements OnInit {
  @Input() state: TaskState | null = null;
  @Output() selectedState: EventEmitter<TaskState>;

  readonly taskStates: Record<TaskState, TaskStateIconData>;
  readonly keys: TaskState[];

  constructor() {
    this.taskStates = {
      [TaskState.NotStarted]: {
        icon: 'new_releases',
        class: 'opacity-015',
        description: 'task-state-icon.NOT_STARTED',
      },
      [TaskState.InProgress]: { icon: 'autorenew', class: 'opacity-04', description: 'task-state-icon.IN_PROGRESS' },
      [TaskState.Finished]: { icon: 'check_circle', class: 'success', description: 'task-state-icon.FINISHED' },
      [TaskState.Suspended]: { icon: 'hourglass_empty', class: 'opacity-04', description: 'task-state-icon.SUSPENDED' },
      [TaskState.Rejected]: { icon: 'cancel', class: 'warn', description: 'task-state-icon.REJECTED' },
    };
    this.keys = Object.getOwnPropertyNames(this.taskStates) as TaskState[];
    this.selectedState = new EventEmitter<TaskState>();
  }

  ngOnInit(): void {}

  onSelect(state: TaskState) {
    this.selectedState.emit(state);
  }
}
