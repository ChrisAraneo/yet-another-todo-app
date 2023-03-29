import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { first, map, switchMap } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { Task } from '../../models/task.model';
import { CREATE_TASK, updateTask, UPDATE_TASK } from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  createTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(CREATE_TASK),
      map((action: any) => action && action?.task),
      switchMap((task: Task) =>
        this.apiClientService
          .postTaskToApi(task)
          .pipe(first())
          .pipe(
            map((result: Task | undefined) =>
              result ? updateTask({ task: result }) : updateTask({ task }),
            ),
          ),
      ),
    ),
  );

  updateTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UPDATE_TASK),
      map((action: any) => action && action?.task),
      switchMap((task: Task) =>
        this.apiClientService
          .postTaskToApi(task)
          .pipe(first())
          .pipe(
            map((result: Task | undefined) =>
              result ? updateTask({ task: result }) : updateTask({ task }),
            ),
          ),
      ),
    ),
  );

  constructor(private actions: Actions, private apiClientService: ApiClientService) {}
}
