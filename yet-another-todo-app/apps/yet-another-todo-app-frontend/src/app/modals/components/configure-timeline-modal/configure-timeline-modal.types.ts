import { FormControl } from '@angular/forms';
import { TaskState } from '@chris.araneo/yet-another-todo-app-models';

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
