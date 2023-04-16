import { Injectable } from '@angular/core';
import { TaskCreator } from 'src/app/shared/models/task-creator.model';
import { Task } from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskCreatorService {
  create(data: any): Task {
    return TaskCreator.create(data);
  }
}
