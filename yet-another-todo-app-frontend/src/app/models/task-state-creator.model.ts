import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from './task-state.model';

export class TaskStateCreator {
  static create(data: any): TaskState {
    const value = data['value'];

    switch (value) {
      case new NotStartedTaskState().toString():
        return new NotStartedTaskState();
      case new InProgressTaskState().toString():
        return new InProgressTaskState();
      case new SuspendedTaskState().toString():
        return new SuspendedTaskState();
      case new CompletedTaskState().toString():
        return new CompletedTaskState();
      case new RejectedTaskState().toString():
        return new RejectedTaskState();
      default:
        throw Error(`Task state cannot be created from object: ${JSON.stringify(data)}`);
    }
  }
}
