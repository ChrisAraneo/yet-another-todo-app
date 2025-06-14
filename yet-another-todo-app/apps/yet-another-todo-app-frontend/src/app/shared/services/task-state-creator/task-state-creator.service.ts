import { Injectable } from '@angular/core';
import { TaskState } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task-state.model';
import { TaskStateCreator } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task-state-creator.model';

@Injectable({
  providedIn: 'root',
})
export class TaskStateCreatorService {
  create(data: any): TaskState {
    return TaskStateCreator.create(data);
  }
}
