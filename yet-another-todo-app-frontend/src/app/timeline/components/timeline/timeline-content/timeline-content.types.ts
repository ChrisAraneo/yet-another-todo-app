import { StartedTask } from 'src/app/shared/models/task.model';

export type Column = {
  tasks: StartedTask[];
  left: string;
};
