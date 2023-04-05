import { Injectable } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from 'src/app/models/task-state.model';
import { Option } from '../../components/form/select/select.types';

@Injectable({
  providedIn: 'root',
})
export class TaskStateTranslationService {
  readonly states: TaskState[] = [
    new NotStartedTaskState(),
    new InProgressTaskState(),
    new SuspendedTaskState(),
    new CompletedTaskState(),
    new RejectedTaskState(),
  ];

  constructor(private translatePipe: TranslatePipe) {}

  getTranslatedSelectOptions(): Option<TaskState>[] {
    return [
      ...this.states.map((state) => ({
        label: this.translatePipe.transform(state.toString()),
        value: state,
      })),
    ];
  }
}
