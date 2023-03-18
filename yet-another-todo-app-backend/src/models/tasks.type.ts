import { Response } from './response.type';
import { TaskState } from './task-state.type';

export type Tasks = Response<Task[]>;

export type Task = {
  id: string;
  title: string;
  description: string;
  state: TaskState;
  creationDate: string;
  startDate?: string;
  endDate?: string;
};
