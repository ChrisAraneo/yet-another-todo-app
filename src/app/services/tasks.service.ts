import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { TaskState } from 'src/app/shared/model/task-state.enum';
import { Task } from 'src/app/shared/model/task.type';
import { createTask, removeTask, updateTaskState } from 'src/app/store/task.actions';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$: Observable<Task[]>;

  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks$ = store.select('tasks');
  }

  createTask(task: Task) {
    this.store.dispatch(createTask({ task }));
  }

  removeTask(taskId: string) {
    this.store.dispatch(removeTask({ taskId }));
  }

  updateTaskState(taskId: string, newState: TaskState) {
    this.store.dispatch(updateTaskState({ taskId, newState }));
  }

  getTasksStream(): Observable<Task[]> {
    return this.tasks$;
  }
}
