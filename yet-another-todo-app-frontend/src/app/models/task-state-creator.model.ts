import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
  TaskStateValue,
} from './task-state.model';

export class TaskStateCreator {
  static create(data: any): TaskState {
    const value = data['value'];

    switch (value) {
      case TaskStateValue.NotStarted:
        return new NotStartedTaskState();
      case TaskStateValue.InProgress:
        return new InProgressTaskState();
      case TaskStateValue.Suspended:
        return new SuspendedTaskState();
      case TaskStateValue.Completed:
        return new CompletedTaskState();
      case TaskStateValue.Rejected:
        return new RejectedTaskState();
      default:
        throw Error(`Task state cannot be created from object: ${JSON.stringify(data)}`);
    }
  }
}
