import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { first } from 'rxjs/operators';
import { TaskState } from 'src/app/shared/model/task-state.enum';
import { Task } from 'src/app/shared/model/task.type';
import { createTask, removeTask, setTasks, updateTaskState } from 'src/app/store/task.actions';
import { environment } from 'src/environments/environment';
import { ApiResponseStatus } from '../shared/model/api-response-status.enum';
import { ApiResponse } from '../shared/model/api-response.type';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {
  tasks$: Observable<Task[]>;

  private url = `${environment.api.origin}/`;
  private subscription: Subscription = new Subscription();
  private isLoading: boolean = true;

  constructor(private store: Store<{ tasks: Task[] }>, private http: HttpClient) {
    this.fetchStoredTasksFromApi(this.url);
    this.tasks$ = store.select('tasks');

    this.subscription.add(
      this.tasks$.subscribe((tasks: Task[]) => {
        !this.isLoading && this.postTasksToApi(this.url, tasks);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  private fetchStoredTasksFromApi(url: string): void {
    this.isLoading = true;

    (this.http.get(url) as Observable<ApiResponse>).pipe(first()).subscribe((response: ApiResponse) => {
      this.isLoading = false;

      if (response && response.status === ApiResponseStatus.Success) {
        const tasks: Task[] = response.data.map((item: any) => {
          const id: string = item.id;
          const title: string = item.title;
          const startDate: Date = new Date(Date.parse(item.startDate));
          const endDate: Date | undefined = item.endDate && new Date(Date.parse(item.endDate));
          const state: TaskState = item.state;
          const task: Task = {
            id,
            title,
            startDate,
            endDate,
            state,
          };
          return task;
        });
        this.setTasks(tasks);
      }
      /* TODO Handling errors */
    });
  }

  private setTasks(tasks: Task[]) {
    this.store.dispatch(setTasks({ tasks }));
  }

  private postTasksToApi(url: string, tasks: Task[]) {
    this.http
      .post(url, tasks)
      .pipe(first())
      .subscribe((_) => {
        /* TODO Handling errors */
      });
  }
}
