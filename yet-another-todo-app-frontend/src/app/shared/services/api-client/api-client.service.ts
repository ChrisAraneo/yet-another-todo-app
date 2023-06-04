import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, first, map } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';
import { TaskCreatorService } from '../task-creator/task-creator.service';
import { ApiResponse, ApiResponseStatus, TaskData } from './api-client.types';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly tasksEndpoint;
  private readonly taskEndpoint;

  constructor(
    @Inject('API') public api: any,
    private http: HttpClient,
    private taskCreator: TaskCreatorService,
  ) {
    this.tasksEndpoint = `${this.api.origin}/tasks`;
    this.taskEndpoint = `${this.api.origin}/task`;
  }

  fetchTasksFromApi(): Observable<Task[] | undefined> {
    return this.http.get<ApiResponse<TaskData[]>>(this.tasksEndpoint).pipe(
      map((response: ApiResponse<TaskData[]>) => {
        if (!response || response.status !== ApiResponseStatus.Success || !response.data) {
          this.printError(response);

          return;
        }

        return this.mapTasks(response.data);
      }),
    );
  }

  postTaskToApi(task: Task): Observable<Task | undefined> {
    return this.http.post<ApiResponse<TaskData>>(this.taskEndpoint, task).pipe(
      first(),
      map((response: ApiResponse<TaskData>) => {
        if (!response || response.status !== ApiResponseStatus.Success || !response.data) {
          this.printError(response);

          return;
        }

        return this.mapTask(response.data);
      }),
    );
  }

  postTasksToApi(tasks: Task[]): Observable<Task[] | undefined> {
    return this.http.post<ApiResponse<TaskData[]>>(this.tasksEndpoint, tasks).pipe(
      first(),
      map((response: ApiResponse<TaskData[]>) => {
        if (!response || response.status !== ApiResponseStatus.Success || !response.data) {
          this.printError(response);

          return;
        }

        return this.mapTasks(response.data);
      }),
    );
  }

  private mapTasks(data: TaskData[]): Task[] {
    return data.map((item) => this.mapTask(item));
  }

  private mapTask(data: TaskData): Task {
    return this.taskCreator.create(data);
  }

  private printError(error: any): void {
    console.error('Error', error);
  }
}
