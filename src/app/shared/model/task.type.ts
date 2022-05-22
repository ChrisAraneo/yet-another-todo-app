import { TaskState } from './task-state.type';

export type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  state: TaskState;
};
