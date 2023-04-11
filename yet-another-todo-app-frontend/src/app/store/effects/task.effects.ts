import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { map, mergeMap, of } from 'rxjs';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { TaskCreatorService } from 'src/app/services/task-creator/task-creator.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '../../models/task.model';
import {
  CREATE_TASK_API,
  HIDE_TASK_API,
  UPDATE_TASK_API,
  createTask,
  hideTask,
  updateTask,
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
                  this.taskCreator.create({ ...JSON.parse(JSON.stringify(task)), isHidden: true }),
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
    private taskCreator: TaskCreatorService,
  ) {}
}
