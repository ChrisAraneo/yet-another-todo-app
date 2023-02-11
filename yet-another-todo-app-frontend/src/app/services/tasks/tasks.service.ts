import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CompletedTaskState } from 'src/app/models/task-state.model';
import { createTask, setTasks, updateTask } from 'src/app/store/actions/task.actions';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import { ApiClientService } from '../api-client/api-client.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private subscription = new Subscription();

  constructor(private store: Store<{ tasks: Task[] }>, private apiClientService: ApiClientService) {
    this.subscription.add(
      this.apiClientService.fetchTasksFromApi().subscribe((tasks: Task[] | undefined) => {
        if (tasks) {
          this.setTasks(tasks);
        }
      }),
    );

    this.subscription.add(
      this.getTasks().subscribe((tasks: Task[]) => this.apiClientService.postTasksToApi(tasks)),
    );
  }

  getTasks(): Observable<Task[]> {
    return this.store.select('tasks');
  }

  addTask(task: Task): void {
    this.store.dispatch(createTask({ task }));
  }

  updateTask(task: Task): void {
    this.store.dispatch(updateTask({ task }));
  }

  completeTask(task: Task): void {
    const now = new Date();
    const updatedTask = new EndedTask(
      task.getTitle(),
      task.getDescription(),
      new CompletedTaskState(),
      task instanceof StartedTask ? task.getStartDate() : now,
      now,
      task.getCreationDate(),
      task.getId(),
    );

    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
  }

  private setTasks(tasks: Task[]): void {
    return this.store.dispatch(setTasks({ tasks: tasks }));
  }
}
