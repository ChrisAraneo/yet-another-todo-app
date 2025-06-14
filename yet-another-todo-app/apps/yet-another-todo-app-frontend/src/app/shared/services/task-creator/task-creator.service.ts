import { Injectable } from '@angular/core';
import { Task } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task.model';
import { TaskCreator } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task-creator.model';

@Injectable({
  providedIn: 'root',
})
export class TaskCreatorService {
  create(data: any): Task {
    return TaskCreator.create(data);
  }
}
