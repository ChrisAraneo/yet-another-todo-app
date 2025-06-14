import { Injectable } from '@angular/core';
import { TaskTransformer } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task-transformer.model';
import { Task } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskTransformerService {
  transform(task: Task, changes: object): Task {
    return TaskTransformer.transform(task, changes);
  }
}
