import { TaskState } from "../shared/models/task-state.model";

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
