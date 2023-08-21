import { createReducer, on } from '@ngrx/store';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
} from '../../models/task-state.model';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';
import { UserLocaleService } from '../../services/user-locale/user-locale.service';
import {
  setTableSort,
  setTimelineEndDate,
  setTimelineStartDate,
  setTimelineTaskStateFilter,
  setTimelineTaskStateOrder,
} from '../actions/configuration.actions';
import { ViewConfiguration } from '../types/view-configuration.type';

export const initialState: ViewConfiguration = {
  timeline: {
    startDate: getInitialTimelineStartDate(),
    endDate: getInitialTimelineEndDate(),
    order: [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new SuspendedTaskState(),
      new CompletedTaskState(),
      new RejectedTaskState(),
    ],
    filter: [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new SuspendedTaskState(),
      new CompletedTaskState(),
      new RejectedTaskState(),
    ],
  },
  table: {
    sort: {
      id: 'creationDate',
      start: 'desc',
      disableClear: false,
    },
  },
};

export const viewConfigurationReducer = createReducer(
  initialState,
  on(setTimelineStartDate, (state, { startDate }) => ({
    ...state,
    timeline: { ...state.timeline, startDate },
  })),
  on(setTimelineEndDate, (state, { endDate }) => ({
    ...state,
    timeline: { ...state.timeline, endDate },
  })),
  on(setTimelineTaskStateOrder, (state, { states }) => ({
    ...state,
    timeline: { ...state.timeline, order: states },
  })),
  on(setTimelineTaskStateFilter, (state, { states }) => ({
    ...state,
    timeline: { ...state.timeline, filter: states },
  })),
  on(setTableSort, (state, { sort }) => ({
    ...state,
    table: { ...state.table, sort: { ...sort } },
  })),
);

function getInitialTimelineStartDate(): Date {
  const today = new Date();

  return new DateUtilsService(new UserLocaleService()).getFirstDayOfTheMonth(today);
}

function getInitialTimelineEndDate(): Date {
  const today = new Date();

  return new DateUtilsService(new UserLocaleService()).getLastDayOfTheMonth(today);
}
