import { Injectable } from '@angular/core';
import { TaskState } from '../../models/task-state.model';
import { TaskStateCreator } from '../../models/task-state-creator.model';


@Injectable({
  providedIn: 'root',
})
export class TaskStateCreatorService {
  create(data: any): TaskState {
    return TaskStateCreator.create(data);
  }
}
