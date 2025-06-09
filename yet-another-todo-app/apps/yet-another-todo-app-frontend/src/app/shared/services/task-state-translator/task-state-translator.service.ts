import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from '../../../../../../yet-another-todo-app-shared';

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

  constructor(private readonly translateService: TranslateService) {}

  getTranslatedTaskStateSelectOptions() {
    return this.states.map((state) => ({
      label: this.translateService.instant(state.toString()),
      value: state,
    }));
  }
}
