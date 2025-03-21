import { FormControl } from '@angular/forms';
import { TaskState } from '../../../../../../yet-another-todo-app-shared';

export type TaskForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  dateRange: FormControl<string | [string] | [string, string] | null>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
};
