import { Injectable } from '@angular/core';
import { TaskState } from '@chris.araneo/yet-another-todo-app-models';
import { TaskStateCreator } from '@chris.araneo/yet-another-todo-app-models';

@Injectable({
  providedIn: 'root',
})
export class TaskStateCreatorService {
  create(data: any): TaskState {
    return TaskStateCreator.create(data);
  }
}
