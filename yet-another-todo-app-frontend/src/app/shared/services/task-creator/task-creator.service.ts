import { Injectable } from '@angular/core';
import { TaskCreator } from 'src/app/shared/models/task-creator.model';
import { Task } from '../../../../../../yet-another-todo-app-shared';

@Injectable({
  providedIn: 'root',
})
export class TaskCreatorService {
  create(data: any): Task {
    return TaskCreator.create(data);
  }
}
