import { FormControl } from '@angular/forms';
import { Task } from '../../../../../../yet-another-todo-app-shared';

export type TaskForm = {
  task: FormControl<Task | null>;
};

export type TaskOption = {
  label: string;
  value: Task;
};
