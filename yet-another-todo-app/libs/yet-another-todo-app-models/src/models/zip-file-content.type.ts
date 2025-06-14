import { Task } from './task.model';

export interface ZipFileContent {
  creationDate: Date;
  tasks: Task[];
}
