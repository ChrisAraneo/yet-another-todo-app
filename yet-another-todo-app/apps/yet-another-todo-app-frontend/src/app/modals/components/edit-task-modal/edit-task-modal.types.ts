import { FormControl } from '@angular/forms';
import { Task } from '../../../../../../../libs/yet-another-todo-app-models/src/lib/task.model';
import { TaskState } from '../../../../../../../libs/yet-another-todo-app-models/src/lib/task-state.model';

export interface EditTaskModalData {
  initialTaskId: string;
}

export interface TaskForm {
  task: FormControl<Task | null>;
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  dateRange: FormControl<string | [string] | [string, string] | null>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
}
