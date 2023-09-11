import { StartedTask, Task } from 'src/app/shared/models/task.model';

export type Column = {
  tasks: StartedTask[];
  left: string;
};

export type TimelineColumn = {
  leftMargin: number;
  tasks: Task[];
};
