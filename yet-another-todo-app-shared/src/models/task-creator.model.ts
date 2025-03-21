import {
  CompletedTaskState,
  EndedTask,
  InProgressTaskState,
  NotStartedTaskState,
  PendingTask,
  RejectedTaskState,
  StartedTask,
  SuspendedTaskState,
  Task,
  TaskState,
  TaskStateCreator,
} from '../..';

export class TaskCreator {
  static create(data: any): Task {
    const title = data['title'];
    const description = data['description'];
    const state: TaskState = TaskStateCreator.create(data['state']);
    const creationDate = data['creationDate'];
    const startDate = data['startDate'];
    const endDate = data['endDate'];
    const id = data['id'];
    const isHidden = !!data['isHidden'];

    if (state instanceof NotStartedTaskState) {
      return this.createPendingTask(
        title,
        description,
        startDate,
        endDate,
        creationDate,
        id,
        isHidden,
      );
    } else if (
      (state instanceof InProgressTaskState || state instanceof SuspendedTaskState) &&
      !!startDate
    ) {
      return this.createStartedTask(
        title,
        description,
        state,
        startDate,
        endDate,
        creationDate,
        id,
        isHidden,
      );
    } else if (
      (state instanceof CompletedTaskState || state instanceof RejectedTaskState) &&
      !!startDate &&
      !!endDate
    ) {
      return this.createEndedTask(
        title,
        description,
        state,
        startDate,
        endDate,
        creationDate,
        id,
        isHidden,
      );
    } else {
      throw Error(`Task cannot be created from object: ${JSON.stringify(data)}`);
    }
  }

  private static createPendingTask(
    title: unknown,
    description: unknown,
    startDate: unknown,
    endDate: unknown,
    creationDate: unknown,
    id?: unknown,
    isHidden?: unknown,
  ): PendingTask {
    this.throwErrorWhenInvalidString(title, new Error(`Incorrect pending task title: ${title}`));

    this.throwErrorWhenNotEmpty(
      startDate,
      new Error(`Pending task has defined startDate: ${startDate}`),
    );

    this.throwErrorWhenNotEmpty(
      endDate,
      new Error(`Pending task has defined startDate: ${endDate}`),
    );

    this.throwErrorWhenInvalidString(
      description,
      new Error(`Incorrect pending task description: ${description}`),
    );

    this.throwErrorWhenInvalidDateString(
      creationDate,
      new Error(`Incorrect pending task creation date: ${creationDate}`),
    );

    const task = new PendingTask(
      title as string,
      description as string,
      new Date(creationDate as string | number),
      !!id && typeof id === 'string' ? id : undefined,
      !!isHidden,
    );

    return task;
  }

  private static createStartedTask(
    title: unknown,
    description: unknown,
    state: unknown,
    startDate: unknown,
    endDate: unknown,
    creationDate: unknown,
    id?: unknown,
    isHidden?: unknown,
  ): PendingTask {
    this.throwErrorWhenInvalidString(title, new Error(`Incorrect started task title: ${title}`));

    this.throwErrorWhenInvalidString(
      description,
      new Error(`Incorrect started task description: ${description}`),
    );

    this.throwErrorWhenInvalidTaskState(state, new Error(`Incorrect started task state: ${state}`));

    this.throwErrorWhenNotEmpty(
      endDate,
      new Error(
        `Task has defined endDate but it is in ${state} state: ${endDate}, ${typeof endDate}`,
      ),
    );

    this.throwErrorWhenInvalidDateString(
      startDate,
      new Error(`Incorrect started task start date: ${startDate}`),
    );

    this.throwErrorWhenInvalidDateString(
      creationDate,
      new Error(`Incorrect started task creation date: ${creationDate}`),
    );

    const task = new StartedTask(
      title as string,
      description as string,
      state as TaskState,
      new Date(startDate as string | number),
      new Date(creationDate as string | number),
      !!id && typeof id === 'string' ? id : undefined,
      !!isHidden,
    );

    return task;
  }

  private static createEndedTask(
    title: unknown,
    description: unknown,
    state: unknown,
    startDate: unknown,
    endDate: unknown,
    creationDate: unknown,
    id?: unknown,
    isHidden?: unknown,
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

    this.throwErrorWhenInvalidDateString(
      creationDate,
      new Error(`Incorrect started task creation date: ${creationDate}`),
    );

    const task = new EndedTask(
      title as string,
      description as string,
      state as TaskState,
      new Date(startDate as string | number),
      new Date(endDate as string | number),
      new Date(creationDate as string | number),
      !!id && typeof id === 'string' ? id : undefined,
      !!isHidden,
    );

    return task;
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

  private static throwErrorWhenNotEmpty(value: unknown, error: Error): void {
    if (value !== undefined && value !== null) {
      throw error;
    }
  }
}
