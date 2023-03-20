import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { Task } from 'src/app/models/task.model';
import { ApiResponse, ApiResponseStatus } from './api-client.types';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly tasksEndpoint;

  constructor(@Inject('API') public api: any, private http: HttpClient) {
    this.tasksEndpoint = `${this.api.origin}/tasks`;
  }

  fetchTasksFromApi(): Observable<Task[] | undefined> {
    return this.http.get<ApiResponse<TaskData[]>>(this.tasksEndpoint).pipe(
      first(),
      map((response: ApiResponse<TaskData[]>) => {
        if (response && response.status === ApiResponseStatus.Success) {
          return this.mapTasks(response);
        }

        this.printError(response);

        return;
      }),
    );
  }

  postTasksToApi(tasks: Task[]): void {
    this.http
      .post<ApiResponse<TaskData[]>>(this.tasksEndpoint, tasks)
      .pipe(first())
      .subscribe((response: ApiResponse<TaskData[]>) => {
        if (!response || response.status !== ApiResponseStatus.Success) {
          this.printError(response);
        }

        return;
      });
  }

  private mapTasks(response: ApiResponse<TaskData[]>): Task[] {
    return (response.data || []).map((item) => {
      return TaskCreator.create(item);
    });
  }

  private printError(error: any): void {
    console.error('Error', error);
  }
}
