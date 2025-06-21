import { Injectable } from '@angular/core';
import { TaskTransformer } from '@chris.araneo/yet-another-todo-app-models';
import { Task } from '@chris.araneo/yet-another-todo-app-models';

@Injectable({
  providedIn: 'root',
})
export class TaskTransformerService {
  transform(task: Task, changes: object): Task {
    return TaskTransformer.transform(task, changes);
  }
}
