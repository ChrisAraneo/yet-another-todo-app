import { FormControl } from '@angular/forms';
import { Task } from '@chris.araneo/yet-another-todo-app-models';
import { TaskState } from '@chris.araneo/yet-another-todo-app-models';

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
