import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, first, map } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';
import { LoginResponse, RefreshResponse } from '../auth/auth.types';
import { TaskCreatorService } from '../task-creator/task-creator.service';
import { ApiResponse, ApiResponseStatus, TaskData } from './api-client.types';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(
    @Inject('API') public api: any,
    private http: HttpClient,
    private taskCreator: TaskCreatorService,
  ) {}

  signIn(username: string, password: string): Observable<LoginResponse | null> {
    return this.http
      .post<ApiResponse<LoginResponse>>(this.api.loginEndpoint, { username, password })
      .pipe(
        first(),
        map((response) => {
          return response.data || null;
        }),
      );
  }

  refreshAccessToken(refreshToken: string): Observable<RefreshResponse | null> {
    return this.http
      .post<ApiResponse<RefreshResponse>>(this.api.refreshEndpoint, { refreshToken })
      .pipe(
        first(),
        map((response: ApiResponse<RefreshResponse | null>) => {
          if (response && response.status === ApiResponseStatus.Success) {
            return response.data || null;
          }

          return null;
        }),
      );
  }

  fetchTasksFromApi(): Observable<Task[] | undefined> {
    return this.http.get<ApiResponse<TaskData[]>>(this.api.tasksEndpoint).pipe(
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

  postTaskToApi(task: Task): Observable<Task | undefined> {
    return this.http.post<ApiResponse<TaskData>>(this.api.taskEndpoint, task).pipe(
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
    return this.http.post<ApiResponse<TaskData[]>>(this.api.tasksEndpoint, tasks).pipe(
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
