import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { Task } from '../../models/task.model';
import { createTask, CREATE_TASK_API, updateTask, UPDATE_TASK_API } from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  createTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(CREATE_TASK_API),
      map((action: any) => action && action?.task),
      mergeMap((task: Task) =>
        this.apiClientService
          .postTaskToApi(task)
          .pipe(
            map((result: Task | undefined) =>
              result ? createTask({ task: result }) : createAction('')(),
            ),
          ),
      ),
    ),
  );

  updateTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UPDATE_TASK_API),
      map((action: any) => action && action?.task),
      mergeMap((task: Task) =>
        this.apiClientService
          .postTaskToApi(task)
          .pipe(
            map((result: Task | undefined) =>
              result ? updateTask({ task: result }) : createAction('')(),
            ),
          ),
      ),
    ),
  );

  constructor(private actions: Actions, private apiClientService: ApiClientService) {}
}
