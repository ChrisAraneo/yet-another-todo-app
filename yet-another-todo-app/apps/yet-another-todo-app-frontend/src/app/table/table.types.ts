import { TaskState } from '@chris.araneo/yet-another-todo-app-shared';

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
