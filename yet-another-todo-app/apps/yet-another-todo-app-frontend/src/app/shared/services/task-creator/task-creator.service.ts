import { Injectable } from '@angular/core';
import { Task } from '@chris.araneo/yet-another-todo-app-models';
import { TaskCreator } from '@chris.araneo/yet-another-todo-app-models';

@Injectable({
  providedIn: 'root',
})
export class TaskCreatorService {
  create(data: any): Task {
    return TaskCreator.create(data);
  }
}
