import { Injectable } from '@angular/core';
import { Task, TaskTransformer } from '../../../../../../yet-another-todo-app-shared';

@Injectable({
  providedIn: 'root',
})
export class TaskTransformerService {
  transform(task: Task, changes: object): Task {
    return TaskTransformer.transform(task, changes);
  }
}
