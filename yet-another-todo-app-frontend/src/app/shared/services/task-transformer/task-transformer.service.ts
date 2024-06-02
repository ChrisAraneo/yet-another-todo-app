import { Injectable } from '@angular/core';
import { Task } from '../../../../../../yet-another-todo-app-shared';
import { TaskTransformer } from '../../models/task-transformer.model';

@Injectable({
  providedIn: 'root',
})
export class TaskTransformerService {
  transform(task: Task, changes: object): Task {
    return TaskTransformer.transform(task, changes);
  }
}
