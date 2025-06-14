import { FormControl } from '@angular/forms';
import { TaskState } from '../../../shared/models/task-state.model';

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
