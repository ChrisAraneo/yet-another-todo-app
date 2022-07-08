import { TaskState } from './task-state.enum';

export type Task = {
  id: string;
  title: string;
  creationDate: Date;
  startDate?: Date;
  endDate?: Date;
  state: TaskState;
};
