import { TaskStateCreator } from './task-state-creator.model';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from './task-state.model';
import { EndedTask, PendingTask, StartedTask, Task } from './task.model';

export class TaskCreator {
  static create(data: any): Task {
    const title = data['title'];
    const description = data['description'];
    const state: TaskState = TaskStateCreator.create(data['state']);
    const creationDate = data['creationDate'];
    const startDate = data['startDate'];
    const endDate = data['endDate'];
    const id = data['id'];

    if (state instanceof NotStartedTaskState) {
      return this.createPendingTask(title, description, creationDate, id);
    } else if (state instanceof InProgressTaskState || state instanceof SuspendedTaskState) {
      return this.createStartedTask(title, description, state, startDate, creationDate, id);
    } else if (state instanceof CompletedTaskState || state instanceof RejectedTaskState) {
      return this.createEndedTask(title, description, state, startDate, endDate, creationDate, id);
    } else {
      throw Error(`Task cannot be created from object: ${JSON.stringify(data)}`);
    }
  }

  private static createPendingTask(
    title: unknown,
    description: unknown,
    creationDate?: unknown,
    id?: unknown,
  ): PendingTask {
    this.throwErrorWhenInvalidString(title, new Error(`Incorrect pending task title: ${title}`));

    this.throwErrorWhenInvalidString(
      description,
      new Error(`Incorrect pending task description: ${description}`),
    );

    this.throwErrorWhenInvalidDateString(
      creationDate,
      new Error(`Incorrect pending task creation date: ${creationDate}`),
    );

    this.throwErrorWhenInvalidString(id, new Error(`Incorrect pending task id: ${id}`));

    return new PendingTask(
      title as string,
      description as string,
      !!creationDate ? new Date(creationDate as string | number) : undefined,
      !!id ? (id as string) : undefined,
    );
  }

  private static createStartedTask(
    title: unknown,
    description: unknown,
    state: unknown,
    startDate: unknown,
    creationDate?: unknown,
    id?: unknown,
  ): PendingTask {
    this.throwErrorWhenInvalidString(title, new Error(`Incorrect started task title: ${title}`));

    this.throwErrorWhenInvalidString(
      description,
      new Error(`Incorrect started task description: ${description}`),
    );

    this.throwErrorWhenInvalidTaskState(state, new Error(`Incorrect started task state: ${state}`));

    this.throwErrorWhenInvalidDateString(
      startDate,
      new Error(`Incorrect started task start date: ${startDate}`),
    );

    !!creationDate &&
      this.throwErrorWhenInvalidDateString(
        creationDate,
        new Error(`Incorrect started task creation date: ${creationDate}`),
      );

    !!id && this.throwErrorWhenInvalidString(id, new Error(`Incorrect started task id: ${id}`));

    return new StartedTask(
      title as string,
      description as string,
      state as TaskState,
      new Date(startDate as string | number),
      !!creationDate ? new Date(creationDate as string | number) : undefined,
      !!id ? (id as string) : undefined,
    );
  }

  private static createEndedTask(
    title: unknown,
    description: unknown,
    state: unknown,
    startDate: unknown,
    endDate: unknown,
    creationDate?: unknown,
    id?: unknown,
  ): PendingTask {
    this.throwErrorWhenInvalidString(title, new Error(`Incorrect ended task title: ${title}`));

    this.throwErrorWhenInvalidString(
      description,
      new Error(`Incorrect ended task description: ${description}`),
    );

    this.throwErrorWhenInvalidTaskState(state, new Error(`Incorrect ended task state: ${state}`));

    this.throwErrorWhenInvalidDateString(
      startDate,
      new Error(`Incorrect ended task start date: ${startDate}`),
    );

    this.throwErrorWhenInvalidDateString(
      endDate,
      new Error(`Incorrect ended task end date: ${endDate}`),
    );

    !!creationDate &&
      this.throwErrorWhenInvalidDateString(
        creationDate,
        new Error(`Incorrect started task creation date: ${creationDate}`),
      );

    !!id && this.throwErrorWhenInvalidString(id, new Error(`Incorrect started task id: ${id}`));

    return new EndedTask(
      title as string,
      description as string,
      state as TaskState,
      new Date(startDate as string | number),
      new Date(endDate as string | number),
      !!creationDate ? new Date(creationDate as string | number) : undefined,
      !!id ? (id as string) : undefined,
    );
  }

  private static throwErrorWhenInvalidString(value: unknown, error: Error): void {
    if (!value || (!!value && typeof value !== 'string')) {
      throw error;
    }
  }

  private static throwErrorWhenInvalidDateString(value: unknown, error: Error): void {
    if (
      !value ||
      (!!value && !(new Date(value as string) instanceof Date)) ||
      isNaN(new Date(value as string).getTime())
    ) {
      throw error;
    }
  }

  private static throwErrorWhenInvalidTaskState(value: unknown, error: Error): void {
    if (!value || !(value instanceof TaskState)) {
      throw error;
    }
  }
}
