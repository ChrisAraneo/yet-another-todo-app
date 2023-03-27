import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map, Observable, Subscription, tap } from 'rxjs';
import { CompletedTaskState } from 'src/app/models/task-state.model';
import { createTask, hideTask, setTasks, updateTask } from 'src/app/store/actions/task.actions';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import { ApiClientService } from '../api-client/api-client.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private subscription = new Subscription();

  constructor(
    private store: Store<{ tasks: Task[] }>,
    private apiClientService: ApiClientService,
    private userService: UserService,
  ) {
    this.subscription.add(
      this.userService.getIsUserLogged().subscribe((isLogged) => {
        if (isLogged) {
          this.apiClientService
            .fetchTasksFromApi()
            .pipe(
              first(),
              tap((tasks: Task[] | undefined) => {
                if (tasks) {
                  this.setTasks(tasks);
                }
              }),
            )
            .subscribe();
        } else {
          this.setTasks([]);
        }
      }),
    );
  }

  getTasks(): Observable<Task[]> {
    return this.store
      .select('tasks')
      .pipe(map((tasks) => (tasks || []).filter((task) => !task.getIsHidden())));
  }

  getHiddenTasks(): Observable<Task[]> {
    return this.store
      .select('tasks')
      .pipe(map((tasks) => (tasks || []).filter((task) => task.getIsHidden())));
  }

  // TODO ngrx effects
  addTask(task: Task): void {
    this.apiClientService
      .postTaskToApi(task)
      .pipe(first())
      .subscribe((task) => {
        if (task) {
          this.store.dispatch(createTask({ task }));
        }
      });
  }

  // TODO ngrx effects
  updateTask(task: Task): void {
    this.apiClientService
      .postTaskToApi(task)
      .pipe(first())
      .subscribe((task) => {
        if (task) {
          this.store.dispatch(updateTask({ task }));
        }
      });
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

    this.updateTask(updatedTask);
  }

  hideTask(taskId: string): void {
    this.store.dispatch(hideTask({ id: taskId }));
  }

  unsubscribe(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private setTasks(tasks: Task[]): void {
    return this.store.dispatch(setTasks({ tasks: tasks }));
  }
}
