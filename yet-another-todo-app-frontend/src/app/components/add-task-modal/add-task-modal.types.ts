import { FormControl } from '@angular/forms';
import { TaskState } from '../../models/task-state.model';

export type TaskForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
};
