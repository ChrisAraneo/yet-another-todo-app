import { FormControl } from '@angular/forms';
import { TaskState } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task-state.model';

export interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  dateRange: FormControl<string | [string] | [string, string] | null>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
}
