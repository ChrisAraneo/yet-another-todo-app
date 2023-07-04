import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter, first, from, map, tap } from 'rxjs';
import { TaskTransformer } from 'src/app/shared/models/task-transformer';
import { v4 as uuidv4 } from 'uuid';
import { ImportAction } from '../../../modals/components/import-tasks-modal/select-import-action-modal/select-import-action-modal.types';
import { HttpLogItem } from '../../models/http-log-item.type';
import { HttpLogType } from '../../models/http-log-type.enum';
import { CompletedTaskState } from '../../models/task-state.model';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import {
  sendCreateTaskRequest,
  sendHideTaskRequest,
  sendUpdateTaskRequest,
  sendUpdateTasksRequest,
  setTasks,
} from '../../store/actions/task.actions';
import { HttpLogState } from '../../store/reducers/http-log.reducer';
import { ApiClientService } from '../api-client/api-client.service';
import { UserService } from '../user/user.service';

// TODO Response observables
@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {
  private subscription!: Subscription;

  constructor(
    public store: Store<{ tasks: Task[]; httpLog: HttpLogState }>,
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

  addTask(task: Task): Observable<HttpLogItem | undefined> {
    const operationId = this.generateOperationId();
    const responseObservable = this.getResponseObservable(operationId, 'post', 'task');

    this.store.dispatch(sendCreateTaskRequest({ task, operationId }));

    return responseObservable;
  }

  // TODO Return response observable
  updateTask(task: Task): string {
    const operationId = this.generateOperationId();

    this.store.dispatch(sendUpdateTaskRequest({ task, operationId }));

    return operationId;
  }

  // TODO Return response observable
  completeTask(task: Task, endDate: Date = new Date()): void {
    const updatedTask = TaskTransformer.transform(task, {
      state: new CompletedTaskState(),
      startDate: task instanceof StartedTask ? task.getStartDate() : endDate,
      endDate: task instanceof EndedTask ? task.getEndDate() : endDate,
    });

    this.updateTask(updatedTask);
  }

  hideTask(taskId: string): Observable<HttpLogItem | undefined> {
    const operationId = this.generateOperationId();
    const responseObservable = this.getResponseObservable(operationId, 'post', 'task');

    this.store.dispatch(sendHideTaskRequest({ id: taskId, operationId }));

    return responseObservable;
  }

  // TODO Unit tests
  importTasks(importedTasks: Task[], action: ImportAction): Observable<void> {
    const operationId = this.generateOperationId();

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
        this.store.dispatch(sendUpdateTasksRequest({ tasks: updatedTasks, operationId }));
      }),
      map(() => {
        return undefined;
      }),
    );
  }

  // TODO Move to separate service
  private generateOperationId(): string {
    return uuidv4();
  }

  private subscribeToUserLoggedIn(): void {
    this.subscription = this.userService.getIsUserLogged().subscribe((isLogged) => {
      if (isLogged) {
        from(this.apiClientService.fetchTasksFromApi(this.generateOperationId()))
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

  private getResponseObservable(
    operationId: string,
    method: string,
    collection: string,
  ): Observable<HttpLogItem | undefined> {
    return this.store.select('httpLog').pipe(
      map((state) =>
        ((state as any)[method][collection] as HttpLogItem[]).filter(
          (item) => item.id === operationId,
        ),
      ),
      map((logs) => logs.find((item) => item.logType === HttpLogType.Response)),
      filter((log) => !!log),
      first(),
    );
  }
}
