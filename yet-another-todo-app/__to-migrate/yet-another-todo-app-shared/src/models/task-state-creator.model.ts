import { get } from 'lodash';

import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from '../..';

export const TaskStateCreator = {
  create(data: { value?: string }): TaskState {
    const value = get(data, 'value');

    switch (value) {
      case new NotStartedTaskState().toString(): {
        return new NotStartedTaskState();
      }
      case new InProgressTaskState().toString(): {
        return new InProgressTaskState();
      }
      case new SuspendedTaskState().toString(): {
        return new SuspendedTaskState();
      }
      case new CompletedTaskState().toString(): {
        return new CompletedTaskState();
      }
      case new RejectedTaskState().toString(): {
        return new RejectedTaskState();
      }
      default: {
        throw new Error(
          `Task state cannot be created from object: ${JSON.stringify(data)}`,
        );
      }
    }
  },
};
