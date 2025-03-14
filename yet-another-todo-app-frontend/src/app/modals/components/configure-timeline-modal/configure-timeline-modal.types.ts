import { FormControl } from '@angular/forms';
import { TaskState } from '../../../../../../yet-another-todo-app-shared';

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
