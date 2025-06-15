import { FormControl } from '@angular/forms';
import { TaskState } from '../../../../../../../libs/yet-another-todo-app-models/src/lib/task-state.model';

export interface ConfigureTimelineModalData {
  startDate: Date;
  endDate: Date;
  statesOrder: TaskState[];
  statesFilter: TaskState[];
}

export interface ConfigureTimelineForm {
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  statesOrder: FormControl<TaskState[]>;
  statesFilter: FormControl<TaskState[]>;
}
