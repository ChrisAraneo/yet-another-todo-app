import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';
import { OPERATION_ID_HEADER_NAME } from '../../models/operation-id-header-name.const';
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

  signIn(username: string, password: string, operationId: string): Promise<LoginResponse | null> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResponse<LoginResponse>>(
          this.api.loginEndpoint,
          { username, password },
          {
            headers: {
              [OPERATION_ID_HEADER_NAME]: operationId,
            },
          },
        )
        .pipe(
          first(),
          map((response) => {
            if (response && response.status === ApiResponseStatus.Success) {
              resolve(response.data || null);
            } else {
              reject(null); // TODO reject or resolve?
            }
          }),
        )
        .subscribe();
    });
  }

  refreshAccessToken(refreshToken: string, operationId: string): Promise<RefreshResponse | null> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResponse<RefreshResponse>>(
          this.api.refreshEndpoint,
          { refreshToken },
          {
            headers: {
              [OPERATION_ID_HEADER_NAME]: operationId,
            },
          },
        )
        .pipe(
          first(),
          map((response: ApiResponse<RefreshResponse | null>) => {
            if (response && response.status === ApiResponseStatus.Success) {
              resolve(response.data || null);
            } else {
              reject(null); // TODO reject or resolve?
            }
          }),
        );
    });
  }

  fetchTasksFromApi(operationId: string): Promise<Task[] | undefined> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ApiResponse<TaskData[]>>(this.api.tasksEndpoint, {
          headers: {
            [OPERATION_ID_HEADER_NAME]: operationId,
          },
        })
        .pipe(
          first(),
          map((response: ApiResponse<TaskData[]>) => {
            if (!response || response.status !== ApiResponseStatus.Success || !response.data) {
              this.printError(response);
              reject(response);
            } else {
              resolve(this.mapTasks(response.data));
            }
          }),
        )
        .subscribe();
    });
  }

  postTaskToApi(task: Task, operationId: string): Promise<Task | undefined> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResponse<TaskData>>(this.api.taskEndpoint, task, {
          headers: {
            [OPERATION_ID_HEADER_NAME]: operationId,
          },
        })
        .pipe(
          first(),
          map((response: ApiResponse<TaskData>) => {
            if (!response || response.status !== ApiResponseStatus.Success || !response.data) {
              this.printError(response);
              reject(response);
            } else {
              resolve(this.mapTask(response.data));
            }
          }),
        )
        .subscribe();
    });
  }

  postTasksToApi(tasks: Task[], operationId: string): Promise<Task[] | undefined> {
    return new Promise((resolve, reject) => {
      this.http
        .post<ApiResponse<TaskData[]>>(this.api.tasksEndpoint, tasks, {
          headers: {
            [OPERATION_ID_HEADER_NAME]: operationId,
          },
        })
        .pipe(
          first(),
          map((response: ApiResponse<TaskData[]>) => {
            if (!response || response.status !== ApiResponseStatus.Success || !response.data) {
              this.printError(response);
              reject(response);
            } else {
              resolve(this.mapTasks(response.data));
            }
          }),
        )
        .subscribe();
    });
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
