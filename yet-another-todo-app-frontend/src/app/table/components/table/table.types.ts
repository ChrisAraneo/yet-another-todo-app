import { TaskState } from '../../../shared/models/task-state.model';

export type TasksDataSource = {
  id: string;
  shortId: string;
  title: string;
  description: string;
  state: TaskState;
  creationDate: string;
  startDate: string | '-';
  endDate: string | '-';
};
