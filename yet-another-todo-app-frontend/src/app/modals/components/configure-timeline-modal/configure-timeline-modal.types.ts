import { FormControl } from '@angular/forms';
import { TaskState } from 'src/app/shared/models/task-state.model';

export type ConfigureTimelineModalData = {
  startDate: Date;
  endDate: Date;
  statesOrder: TaskState[];
  statesFilter: TaskState[];
};

export type ConfigureTimelineForm = {
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  statesOrder: FormControl<TaskState[]>;
  statesFilter: FormControl<TaskState[]>;
};
