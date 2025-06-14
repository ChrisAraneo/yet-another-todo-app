import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskCreator } from '../../models/task-creator.model';

@Injectable({
  providedIn: 'root',
})
export class TaskCreatorService {
  create(data: any): Task {
    return TaskCreator.create(data);
  }
}
