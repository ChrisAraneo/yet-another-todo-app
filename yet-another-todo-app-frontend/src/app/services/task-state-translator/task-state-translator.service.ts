import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Option } from '../../forms/components/select/select.types';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from '../../models/task-state.model';

@Injectable({
  providedIn: 'root',
})
export class TaskStateTranslatorService {
  readonly states: TaskState[] = [
    new NotStartedTaskState(),
    new InProgressTaskState(),
    new SuspendedTaskState(),
    new CompletedTaskState(),
    new RejectedTaskState(),
  ];

  constructor(private translateService: TranslateService) {}

  getTranslatedTaskStateSelectOptions(): Option<TaskState>[] {
    return [
      ...this.states.map((state) => ({
        label: this.translateService.instant(state.toString()),
        value: state,
      })),
    ];
  }
}
