import { FormControl } from '@angular/forms';
import { Task } from '@chris.araneo/yet-another-todo-app-models';

export interface TaskForm {
  task: FormControl<Task | null>;
}

export interface TaskOption {
  label: string;
  value: Task;
}
