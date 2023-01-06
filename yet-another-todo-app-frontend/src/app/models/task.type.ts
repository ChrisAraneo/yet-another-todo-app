import { TaskState } from './task-state.model';

export type Task = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  state: TaskState;
};
