import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { first, map, switchMap } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { createTask, CREATE_TASK } from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  createTaskEffect = createEffect(() =>
    this.actions.pipe(
      ofType(CREATE_TASK),
      map((action: any) => action && action?.task),
      switchMap((task) =>
        this.apiClientService
          .postTaskToApi(task)
          .pipe(first())
          .pipe(map((result) => createTask({ task: TaskCreator.create(result) }))),
      ),
    ),
  );

  constructor(private actions: Actions, private apiClientService: ApiClientService) {}
}
