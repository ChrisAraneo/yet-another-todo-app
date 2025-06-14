import { FormControl } from '@angular/forms';
import { Task } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task.model';

export interface TaskForm {
  task: FormControl<Task | null>;
}

export interface TaskOption {
  label: string;
  value: Task;
}
