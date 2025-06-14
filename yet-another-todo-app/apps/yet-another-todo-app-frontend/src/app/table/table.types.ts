import { TaskState } from '@chris.araneo/yet-another-todo-app-models';

export interface TasksDataSource {
  id: string;
  shortId: string;
  title: string;
  description: string;
  state: TaskState;
  creationDate: string;
  startDate: string | '-';
  endDate: string | '-';
}
