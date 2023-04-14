import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, first, map, tap } from 'rxjs';
import { CompletedTaskState } from 'src/app/models/task-state.model';
import { TaskTransformer } from 'src/app/models/task-transformer';
import {
  sendCreateTaskRequest,
  sendHideTaskRequest,
  sendUpdateTaskRequest,
  setTasks,
} from 'src/app/store/actions/task.actions';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import { ApiClientService } from '../api-client/api-client.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {
  private subscription!: Subscription;

  constructor(
    public store: Store<{ tasks: Task[] }>,
    private apiClientService: ApiClientService,
    private userService: UserService,
  ) {
    this.subscribeToUserLoggedIn();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
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

  addTask(task: Task): void {
    this.store.dispatch(sendCreateTaskRequest({ task }));
  }

  updateTask(task: Task): void {
    this.store.dispatch(sendUpdateTaskRequest({ task }));
  }

  completeTask(task: Task, endDate: Date = new Date()): void {
    const updatedTask = TaskTransformer.transform(task, {
      state: new CompletedTaskState(),
      startDate: task instanceof StartedTask ? task.getStartDate() : endDate,
      endDate: task instanceof EndedTask ? task.getEndDate() : endDate,
    });

    this.updateTask(updatedTask);
  }

  hideTask(taskId: string): void {
    this.store.dispatch(sendHideTaskRequest({ id: taskId }));
  }

  private subscribeToUserLoggedIn(): void {
    this.subscription = this.userService.getIsUserLogged().subscribe((isLogged) => {
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
    });
  }

  private setTasks(tasks: Task[]): void {
    return this.store.dispatch(setTasks({ tasks: tasks }));
  }
}
