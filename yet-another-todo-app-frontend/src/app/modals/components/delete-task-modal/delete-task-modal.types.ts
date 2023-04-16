import { FormControl } from '@angular/forms';
import { Task } from '../../../shared/models/task.model';

export type TaskForm = {
  task: FormControl<Task | null>;
};

export type TaskOption = {
  label: string;
  value: Task;
};
