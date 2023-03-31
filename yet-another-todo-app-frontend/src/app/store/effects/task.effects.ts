import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { map, mergeMap, of } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '../../models/task.model';
import {
  createTask,
  CREATE_TASK_API,
  hideTask,
  HIDE_TASK_API,
  updateTask,
  UPDATE_TASK_API,
} from '../actions/task.actions';

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

  hideTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(HIDE_TASK_API),
      map((action: any) => action && action?.id),
      mergeMap((id: string) =>
        this.tasksService.getTasks().pipe(
          map((tasks) => tasks.find((item) => item.getId() === id)),
          mergeMap((task: Task | undefined) => {
            if (!!task) {
              return this.apiClientService
                .postTaskToApi(
                  TaskCreator.create({ ...JSON.parse(JSON.stringify(task)), isHidden: true }),
                )
                .pipe(map(() => id));
            } else {
              return of(undefined);
            }
          }),
        ),
      ),
      map((result) => (result ? hideTask({ id: result }) : createAction('')())),
    ),
  );

  constructor(
    private actions: Actions,
    private apiClientService: ApiClientService,
    private tasksService: TasksService,
  ) {}
}
