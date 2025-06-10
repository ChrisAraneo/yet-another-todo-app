import {
  StartedTask,
  Task,
} from '../../../../../../../yet-another-todo-app-shared';

export interface Column {
  tasks: StartedTask[];
  left: string;
}

export interface TimelineColumn {
  leftMargin: number;
  tasks: Task[];
}
