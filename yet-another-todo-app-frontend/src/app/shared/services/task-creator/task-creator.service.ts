import { Injectable } from '@angular/core';
import { Task, TaskCreator } from '../../../../../../yet-another-todo-app-shared';

@Injectable({
  providedIn: 'root',
})
export class TaskCreatorService {
  create(data: any): Task {
    return TaskCreator.create(data);
  }
}
