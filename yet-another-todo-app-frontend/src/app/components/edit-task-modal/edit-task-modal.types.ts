import { FormControl } from '@angular/forms';
import { TaskState } from '../../models/task-state.model';
import { Task } from '../../models/task.model';

export type TaskForm = {
  task: FormControl<Task | null>;
  title: FormControl<string>;
  description: FormControl<string>;
  state: FormControl<TaskState>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
};

export type TaskOption = {
  label: string;
  value: Task;
};
