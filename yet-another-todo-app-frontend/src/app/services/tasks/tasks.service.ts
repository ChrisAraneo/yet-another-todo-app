import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import {
  CompletedTaskState,
  InProgressTaskState,
  RejectedTaskState,
  SuspendedTaskState,
} from 'src/app/models/task-state.model';
import { setTasks } from 'src/app/store/actions/task.actions';
import { environment } from 'src/environments/environment';
import { EndedTask, PendingTask, StartedTask, Task } from '../../models/task.model';

enum ApiResponseStatus {
  Success = 'success',
}

type ApiResponse = {
  status: 'success';
  data: Array<{
    id: string;
    title: string;
    description: string;
    state: {
      value: string;
      iconName: string;
      color: string;
      tooltipText: string;
    };
    creationDate: string;
    startDate?: string;
    endDate?: string;
  }>;
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private url = `${environment.api.origin}/`;

  constructor(private store: Store<{ tasks: Task[] }>, private http: HttpClient) {
    this.fetchStoredTasksFromApi(this.url);
  }

  getTasks(): Observable<Task[]> {
    return this.store.select('tasks');
  }

  // TODO Refactoring
  private fetchStoredTasksFromApi(url: string): void {
    this.http
      .get<ApiResponse>(url)
      .pipe(first())
      .subscribe((response: ApiResponse) => {
        if (response.status === ApiResponseStatus.Success) {
          const tasks = response.data.map((item) => {
            const { id, title, description, state, creationDate } = item;

            if (item.endDate) {
              const state =
                item.state.value == 'COMPLETED'
                  ? new CompletedTaskState()
                  : new RejectedTaskState(); // TODO Code it normally instead of this workaround

              return new EndedTask(
                title,
                description,
                state,
                new Date(item.startDate!),
                new Date(item.endDate),
                new Date(creationDate),
                id,
              );
            } else if (item.startDate) {
              const state =
                item.state.value == 'IN_PROGRESS'
                  ? new InProgressTaskState()
                  : new SuspendedTaskState(); // TODO Code it normally instead of this workaround

              return new StartedTask(
                title,
                description,
                state,
                new Date(item.startDate!),
                new Date(creationDate),
                id,
              );
            } else {
              return new PendingTask(title, description, new Date(creationDate), id);
            }
          });

          this.setTasks(tasks);
        }
      });
  }

  private setTasks(tasks: Task[]): void {
    return this.store.dispatch(setTasks({ tasks: tasks }));
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
