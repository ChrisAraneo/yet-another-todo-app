import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { from, map, mergeMap, of } from 'rxjs';
import { ApiClientService } from 'src/app/shared/services/api-client/api-client.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from '../../../../../../yet-another-todo-app-shared';
import { TaskTransformerService } from '../../services/task-transformer/task-transformer.service';
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
  readonly createTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(CREATE_TASK_API),
      mergeMap((action: any) =>
        from(this.apiClientService.postTaskToApi(action.task, action.operationId)).pipe(
          map((result: Task | undefined) =>
            result ? createTask({ task: result }) : createAction('')(),
          ),
        ),
      ),
    ),
  );

  readonly updateTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UPDATE_TASK_API),
      mergeMap((action: any) =>
        from(this.apiClientService.postTaskToApi(action.task, action.operationId)).pipe(
          map((result: Task | undefined) =>
            result ? updateTask({ task: result }) : createAction('')(),
          ),
        ),
      ),
    ),
  );

  readonly hideTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(HIDE_TASK_API),
      mergeMap((action: any) =>
        this.tasksService.getTasks().pipe(
          map((tasks) => tasks.find((item) => item.getId() === action.id)),
          mergeMap((task: Task | undefined) => {
            if (!!task) {
              const hiddenTask = this.taskTransformerService.transform(task, { isHidden: true });

              return from(this.apiClientService.postTaskToApi(hiddenTask, action.operationId)).pipe(
                map(() => action.id),
              );
            } else {
              return of(undefined);
            }
          }),
        ),
      ),
      map((result) => (result ? hideTask({ id: result }) : createAction('')())),
    ),
  );

  readonly updateTasksEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UPDATE_TASKS_API),
      mergeMap((action: any) =>
        from(this.apiClientService.postTasksToApi(action.tasks, action.operationId)).pipe(
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
    private taskTransformerService: TaskTransformerService,
  ) {}
}
