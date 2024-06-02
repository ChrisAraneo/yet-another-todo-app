import { StartedTask, Task } from '../../../../../../../yet-another-todo-app-shared';

export type Column = {
  tasks: StartedTask[];
  left: string;
};

export type TimelineColumn = {
  leftMargin: number;
  tasks: Task[];
};
