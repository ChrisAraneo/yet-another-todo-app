import { FormControl } from '@angular/forms';
import { Task } from '../../../shared/models/task.model';

export interface TaskForm {
  task: FormControl<Task | null>;
}

export interface TaskOption {
  label: string;
  value: Task;
}
