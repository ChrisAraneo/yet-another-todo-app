import { StartedTask, Task } from '@chris.araneo/yet-another-todo-app-shared';

export interface Column {
  tasks: StartedTask[];
  left: string;
}

export interface TimelineColumn {
  leftMargin: number;
  tasks: Task[];
  style: object;
}
