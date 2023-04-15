import { FormControl } from '@angular/forms';
import { Task } from '../../../models/task.model';

export type TaskForm = {
  task: FormControl<Task | null>;
};

export type TaskOption = {
  label: string;
  value: Task;
};
