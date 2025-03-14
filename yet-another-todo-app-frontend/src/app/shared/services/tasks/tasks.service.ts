import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  filter,
  first,
  from,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import {
  CompletedTaskState,
  EndedTask,
  StartedTask,
  Task,
} from '../../../../../../yet-another-todo-app-shared';
import { ImportAction } from '../../../modals/components/import-tasks-modal/select-import-action-modal/select-import-action-modal.types';
import { HttpLogItem } from '../../models/http-log-item.type';
import { HttpLogType } from '../../models/http-log-type.enum';
import {
  createTask,
  hideTask,
  sendCreateTaskRequest,
  sendHideTaskRequest,
  sendUpdateTaskRequest,
  sendUpdateTasksRequest,
  setTasks,
  updateTask,
} from '../../store/actions/task.actions';
import { HttpLogState } from '../../store/types/http-log-state.type';
import { ApiClientService } from '../api-client/api-client.service';
import { OperationIdGeneratorService } from '../operation-id-generator/operation-id-generator.service';
import { TaskTransformerService } from '../task-transformer/task-transformer.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private tasks!: BehaviorSubject<Task[]>;
  private isOfflineMode!: BehaviorSubject<boolean>;

  constructor(
    public store: Store<{ tasks: Task[]; httpLog: HttpLogState }>,
    private apiClientService: ApiClientService,
    private userService: UserService,
    private operationIdGeneratorService: OperationIdGeneratorService,
    private taskTransformerService: TaskTransformerService,
  ) {
    this.initializeTasksBehaviorSubject();
    this.initializeIsOfflineModeBehaviorSubject();
    this.subscribeToUserLoggedIn();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  getTasks(): Observable<Task[]> {
    const notHiddenTasksFilter = map((tasks: Task[]) =>
      tasks.filter((task) => !task.getIsHidden()),
    );

    return this.tasks.asObservable().pipe(notHiddenTasksFilter);
  }

  getHiddenTasks(): Observable<Task[]> {
    const hiddenTasksFilter = map((tasks: Task[]) => tasks.filter((task) => task.getIsHidden()));

    return this.tasks.asObservable().pipe(hiddenTasksFilter);
  }

  addTask(task: Task): Observable<HttpLogItem | undefined> {
    if (this.isOfflineMode.getValue()) {
      this.store.dispatch(createTask({ task }));

      return of(undefined);
    }

    const operationId = this.operationIdGeneratorService.generate();
    const responseObservable = this.getResponseObservable(operationId, 'post', 'task');

    this.store.dispatch(sendCreateTaskRequest({ task, operationId }));

    return responseObservable;
  }

  updateTask(task: Task): Observable<HttpLogItem | undefined> {
    if (this.isOfflineMode.getValue()) {
      this.store.dispatch(updateTask({ task }));

      return of(undefined);
    }

    const operationId = this.operationIdGeneratorService.generate();
    const responseObservable = this.getResponseObservable(operationId, 'post', 'task');

    this.store.dispatch(sendUpdateTaskRequest({ task, operationId }));

    return responseObservable;
  }

  completeTask(task: Task, endDate: Date = new Date()): Observable<HttpLogItem | undefined> {
    const updatedTask = this.taskTransformerService.transform(task, {
      state: new CompletedTaskState(),
      startDate: task instanceof StartedTask ? task.getStartDate() : endDate,
      endDate: task instanceof EndedTask ? task.getEndDate() : endDate,
    });

    return this.updateTask(updatedTask);
  }

  hideTask(taskId: string): Observable<HttpLogItem | undefined> {
    if (this.isOfflineMode.getValue()) {
      this.store.dispatch(hideTask({ id: taskId }));

      return of(undefined);
    }

    const operationId = this.operationIdGeneratorService.generate();
    const responseObservable = this.getResponseObservable(operationId, 'post', 'task');

    this.store.dispatch(sendHideTaskRequest({ id: taskId, operationId }));

    return responseObservable;
  }

  importTasks(importedTasks: Task[], action: ImportAction): Observable<void> {
    const operationId = this.operationIdGeneratorService.generate();

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
        if (this.isOfflineMode.getValue()) {
          this.setTasks(updatedTasks);
        } else {
          this.store.dispatch(sendUpdateTasksRequest({ tasks: updatedTasks, operationId }));
        }
      }),
      map(() => {
        return undefined;
      }),
    );
  }

  private initializeTasksBehaviorSubject(): void {
    const subscription = this.store.select('tasks').subscribe((tasks) => {
      if (!this.tasks) {
        this.tasks = new BehaviorSubject(tasks || []);
      } else {
        this.tasks.next(tasks || []);
      }
    });

    this.subscription.add(subscription);
  }

  private initializeIsOfflineModeBehaviorSubject(): void {
    this.isOfflineMode = new BehaviorSubject(false);

    const subscription = this.userService.getIsOfflineMode().subscribe((value) => {
      this.isOfflineMode.next(value);
    });

    this.subscription.add(subscription);
  }

  private subscribeToUserLoggedIn(): void {
    const subscription = this.userService.getIsUserLogged().subscribe((isLogged) => {
      if (isLogged) {
        from(this.apiClientService.fetchTasksFromApi(this.operationIdGeneratorService.generate()))
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

    this.subscription.add(subscription);
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
    return tasks.map((task) => this.taskTransformerService.transform(task, { isHidden: true }));
  }

  private getResponseObservable(
    operationId: string,
    method: string,
    collection: string,
  ): Observable<HttpLogItem | undefined> {
    return this.store.select('httpLog').pipe(
      tap((state) => {
        if (!(state as any)[method]) {
          throw Error(`HttpLog state unknown method: ${method}`);
        }
        if (!(state as any)[method][collection]) {
          throw Error(`HttpLog state unknown collection: ${method}.${collection}`);
        }
      }),
      map((state) =>
        ((state as any)[method][collection] as HttpLogItem[]).filter(
          (item) => item.id === operationId,
        ),
      ),
      map((logs) => logs.find((item) => item.logType === HttpLogType.Response)),
      filter((log) => !!log),
      take(1),
    );
  }
}
