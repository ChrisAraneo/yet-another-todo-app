import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { from, map, mergeMap, of } from 'rxjs';
import { TaskTransformer } from 'src/app/shared/models/task-transformer';
import { ApiClientService } from 'src/app/shared/services/api-client/api-client.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from '../../models/task.model';
import {
  CREATE_TASK_API,
  HIDE_TASK_API,
  UPDATE_TASKS_API,
  UPDATE_TASK_API,
  createTask,
  hideTask,
  setTasks,
  updateTask,
} from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  createTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(CREATE_TASK_API),
      map((action: any) => action && action?.task),
      mergeMap((task: Task) =>
        from(this.apiClientService.postTaskToApi(task)).pipe(
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
        from(this.apiClientService.postTaskToApi(task)).pipe(
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
              const hiddenTask = TaskTransformer.transform(task, { isHidden: true }); // TODO Transformer to service

              return from(this.apiClientService.postTaskToApi(hiddenTask)).pipe(map(() => id));
            } else {
              return of(undefined);
            }
          }),
        ),
      ),
      map((result) => (result ? hideTask({ id: result }) : createAction('')())),
    ),
  );

  updateTasksEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UPDATE_TASKS_API),
      map((action: any) => action && action?.tasks),
      mergeMap((tasks: Task[]) =>
        from(this.apiClientService.postTasksToApi(tasks)).pipe(
          map((result: Task[] | undefined) =>
            result ? setTasks({ tasks: result }) : createAction('')(),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions: Actions,
    private apiClientService: ApiClientService,
    private tasksService: TasksService,
  ) {}
}
