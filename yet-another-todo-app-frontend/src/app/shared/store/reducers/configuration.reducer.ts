import { createReducer, on } from '@ngrx/store';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';
import { setTimelineEndDate, setTimelineStartDate } from '../actions/configuration.actions';

// TODO Move to separate file
export type ViewConfiguration = {
  timeline: {
    startDate: Date;
    endDate: Date;
  };
};

export const initialState: ViewConfiguration = {
  timeline: {
    startDate: getInitialTimelineStartDate(),
    endDate: getInitialTimelineEndDate(),
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
);

function getInitialTimelineStartDate(): Date {
  const today = new Date();

  return new DateUtilsService().getFirstDayOfTheMonth(today);
}

function getInitialTimelineEndDate(): Date {
  const today = new Date();

  return new DateUtilsService().getLastDayOfTheMonth(today);
}
