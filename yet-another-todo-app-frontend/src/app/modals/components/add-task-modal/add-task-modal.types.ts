import { FormControl } from '@angular/forms';
import { TaskState } from '../../../shared/models/task-state.model';

export type TaskForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
};
