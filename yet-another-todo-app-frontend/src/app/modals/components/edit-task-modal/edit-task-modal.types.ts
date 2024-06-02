import { FormControl } from '@angular/forms';
import { Task, TaskState } from '../../../../../../yet-another-todo-app-shared';

export type EditTaskModalData = {
  initialTaskId: string;
};

export type TaskForm = {
  task: FormControl<Task | null>;
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  dateRange: FormControl<string | [string] | [string, string] | null>;
  startTime: FormControl<string>;
  endTime: FormControl<string>;
};
