import { Injectable } from '@angular/core';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskCreatorService {
  create(data: any): Task {
    return TaskCreator.create(data);
  }
}
