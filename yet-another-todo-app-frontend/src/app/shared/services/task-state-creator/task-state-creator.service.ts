import { Injectable } from '@angular/core';
import { TaskState, TaskStateCreator } from '../../../../../../yet-another-todo-app-shared';

@Injectable({
  providedIn: 'root',
})
export class TaskStateCreatorService {
  create(data: any): TaskState {
    return TaskStateCreator.create(data);
  }
}
