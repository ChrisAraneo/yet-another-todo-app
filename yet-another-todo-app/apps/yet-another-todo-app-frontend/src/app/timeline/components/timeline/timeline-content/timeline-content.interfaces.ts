import { StartedTask, Task } from "../../../../shared/models/task.model";

export interface Column {
  tasks: StartedTask[];
  left: string;
}

export interface TimelineColumn {
  leftMargin: number;
  tasks: Task[];
  style: object;
}
