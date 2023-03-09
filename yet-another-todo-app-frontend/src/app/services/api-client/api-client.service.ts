import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { Task } from 'src/app/models/task.model';
import { environment } from 'src/environments/environment';
import { ApiResponse, ApiResponseStatus } from './api-client.types';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly url = `${environment.api.origin}`; // TODO Extract to token
  private readonly loginEndpoint = `${this.url}/login`;
  private readonly tasksEndpoint = `${this.url}/tasks`;

  constructor(private http: HttpClient) {}

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

  login(username: string, password: string): Observable<string | null> {
    return this.http.post<ApiResponse<string>>(this.loginEndpoint, { username, password }).pipe(
      first(),
      map((response: ApiResponse<string | null>) => {
        if (response && response.status === ApiResponseStatus.Success) {
          return response.data || null;
        }

        return null;
      }),
    );
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
