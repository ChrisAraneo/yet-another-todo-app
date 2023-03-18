import { TaskState } from './task-state.type';

export type Task = {
  id: string;
  title: string;
  description: string;
  state: TaskState;
  creationDate: string;
  startDate?: string;
  endDate?: string;
};
