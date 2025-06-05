import { FormControl } from '@angular/forms';
import { Task, TaskState } from '@chris.araneo/yet-another-todo-app-shared';

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
