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
  private url = `${environment.api.origin}/`; // TODO Extract to token

  constructor(private http: HttpClient) {}

  fetchTasksFromApi(): Observable<Task[] | undefined> {
    return this.http.get<ApiResponse>(this.url).pipe(
      first(),
      map((response: ApiResponse) => {
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
      .post<ApiResponse>(this.url, tasks)
      .pipe(first())
      .subscribe((response: ApiResponse) => {
        if (!response || response.status !== ApiResponseStatus.Success) {
          this.printError(response);
        }

        return;
      });
  }

  private mapTasks(response: ApiResponse): Task[] {
    return (response.data || []).map((item) => {
      return TaskCreator.create(item);
    });
  }

  private printError(error: any): void {
    console.log(error);
  }
}
