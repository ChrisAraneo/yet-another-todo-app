import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, first, map, tap } from 'rxjs';
import { TaskTransformer } from 'src/app/shared/models/task-transformer';
import { ImportAction } from '../../../modals/components/import-tasks-modal/select-import-action-modal/select-import-action-modal.types';
import { CompletedTaskState } from '../../models/task-state.model';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import {
  sendCreateTaskRequest,
  sendHideTaskRequest,
  sendUpdateTaskRequest,
  sendUpdateTasksRequest,
  setTasks,
} from '../../store/actions/task.actions';
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

  // TODO Unit tests
  importTasks(importedTasks: Task[], action: ImportAction): Observable<void> {
    return this.store.select('tasks').pipe(
      first(),
      map((currentTasks: Task[]) => {
        let updatedTasks: Task[];

        switch (action) {
          case ImportAction.AddNewAndSkipExisting:
            updatedTasks = this.addNewTasks(currentTasks, importedTasks);
            break;
          case ImportAction.AddNewAndUpdateExisting:
            updatedTasks = this.updateExistingTasks(currentTasks, importedTasks);
            updatedTasks = this.addNewTasks(updatedTasks, importedTasks);
            break;
          case ImportAction.ReplaceDataSet:
            updatedTasks = this.hideAllTasks(currentTasks);
            updatedTasks = this.updateExistingTasks(updatedTasks, importedTasks);
            updatedTasks = this.addNewTasks(updatedTasks, importedTasks);
            break;
        }

        return updatedTasks;
      }),
      tap((updatedTasks) => {
        this.store.dispatch(sendUpdateTasksRequest({ tasks: updatedTasks }));
      }),
      map(() => {
        return undefined;
      }),
    );
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

  private addNewTasks(currentTasks: Task[], importedTasks: Task[]): Task[] {
    const result = [...currentTasks];

    importedTasks.forEach((importedTask) => {
      if (!currentTasks.find((item) => item.getId() === importedTask.getId())) {
        result.push(importedTask);
      }
    });

    return result;
  }

  private updateExistingTasks(currentTasks: Task[], importedTasks: Task[]): Task[] {
    const result: Task[] = [];

    currentTasks.forEach((currentTask) => {
      const updatedTask = importedTasks.find((item) => item.getId() === currentTask.getId());

      if (updatedTask) {
        result.push(updatedTask);
      } else {
        result.push(currentTask);
      }
    });

    return result;
  }

  private hideAllTasks(tasks: Task[]): Task[] {
    return tasks.map((task) => TaskTransformer.transform(task, { isHidden: true }));
  }
}
