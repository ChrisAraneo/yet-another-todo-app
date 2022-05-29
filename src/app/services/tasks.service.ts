import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { TaskState } from 'src/app/shared/model/task-state.enum';
import { Task } from 'src/app/shared/model/task.type';
import { createTask, removeTask, updateTaskState } from 'src/app/store/task.actions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {
  tasks$: Observable<Task[]>;

  private url = `${environment.api.origin}/`;
  private subscription: Subscription;

  constructor(private store: Store<{ tasks: Task[] }>, private http: HttpClient) {
    this.fetchStoredTasksFromApi(this.url);
    this.tasks$ = store.select('tasks');
    this.subscription = this.tasks$.subscribe((tasks) => this.postTasksToApi(this.url, tasks));
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

  private fetchStoredTasksFromApi(url: string) {
    this.http.get(url).subscribe((response: any) => {
      if (response && response.status == 'success') {
        const data: any[] = response.data;
        data.forEach((item: any) => {
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
          this.createTask(task);
        });
      }
    });
  }

  private postTasksToApi(url: string, tasks: Task[]) {
    this.http.post(url, tasks).subscribe((_) => {});
  }
}
