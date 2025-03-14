import { MatSortable } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';
import { TaskState } from '../../../../../../yet-another-todo-app-shared';
import { AppMode } from '../types/view-configuration.type';

const SET_APP_MODE = 'SET_APP_MODE';
const SET_TIMELINE_START_DATE = 'SET_TIMELINE_START_DATE';
const SET_TIMELINE_END_DATE = 'SET_TIMELINE_END_DATE';
const SET_TIMELINE_TASK_STATE_ORDER = 'SET_TIMELINE_TASK_STATE_ORDER';
const SET_TIMELINE_TASK_STATE_FILTER = 'SET_TIMELINE_TASK_STATE_FILTER';
const SET_TABLE_SORT = 'SET_TABLE_SORT';

export const setAppMode = createAction(SET_APP_MODE, props<{ mode: AppMode }>());
export const setTimelineStartDate = createAction(
  SET_TIMELINE_START_DATE,
  props<{ startDate: Date }>(),
);
export const setTimelineEndDate = createAction(SET_TIMELINE_END_DATE, props<{ endDate: Date }>());
export const setTimelineTaskStateOrder = createAction(
  SET_TIMELINE_TASK_STATE_ORDER,
  props<{ states: TaskState[] }>(),
);
export const setTimelineTaskStateFilter = createAction(
  SET_TIMELINE_TASK_STATE_FILTER,
  props<{ states: TaskState[] }>(),
);
export const setTableSort = createAction(SET_TABLE_SORT, props<{ sort: MatSortable }>());
