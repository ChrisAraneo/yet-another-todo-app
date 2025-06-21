import { FormControl } from '@angular/forms';
import { TaskState } from '@chris.araneo/yet-another-todo-app-models';

export interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  dateRange: FormControl<string | [string] | [string, string] | null>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
}
