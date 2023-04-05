import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(private translateService: TranslateService) {}

  getTranslatedSelectOptions(): Option<TaskState>[] {
    return [
      ...this.states.map((state) => ({
        label: this.translateService.instant(state.toString()),
        value: state,
      })),
    ];
  }
}
