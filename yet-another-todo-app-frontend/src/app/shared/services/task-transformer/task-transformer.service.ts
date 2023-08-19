import { Injectable } from '@angular/core';
import { TaskTransformer } from '../../models/task-transformer.model';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskTransformerService {
  transform(task: Task, changes: object): Task {
    return TaskTransformer.transform(task, changes);
  }
}
