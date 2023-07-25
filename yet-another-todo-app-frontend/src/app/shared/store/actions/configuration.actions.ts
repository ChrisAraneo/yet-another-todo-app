import { MatSortable } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';

const SET_TIMELINE_START_DATE = 'SET_TIMELINE_START_DATE';
const SET_TIMELINE_END_DATE = 'SET_TIMELINE_END_DATE';
const SET_TABLE_SORT = 'SET_TABLE_SORT';

export const setTimelineStartDate = createAction(
  SET_TIMELINE_START_DATE,
  props<{ startDate: Date }>(),
);
export const setTimelineEndDate = createAction(SET_TIMELINE_END_DATE, props<{ endDate: Date }>());
export const setTableSort = createAction(SET_TABLE_SORT, props<{ sort: MatSortable }>());
