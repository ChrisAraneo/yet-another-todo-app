import { v4 as uuidv4 } from 'uuid';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from './task-state.model';

export abstract class Task {
  private id: string;
  private title: string;
  private description: string;
  private state: TaskState;
  private creationDate: Date;
  private isHidden: boolean;

  constructor(
    title: string,
    description: string,
    state: TaskState,
    creationDate?: Date,
    id?: string,
  ) {
    this.title = title;
    this.description = description;
    this.state = state;
    this.creationDate = creationDate || new Date();
    this.id = id || uuidv4();
    this.isHidden = false;
  }

  getId(): string {
    return this.id;
  }

  getShortId(): string {
    const parts = this.id.split('-');

    return `${parts[0][0]}${parts[0][1]}${parts[1][0]}${parts[2][0]}${parts[3][0]}${
      parts[4][parts[4].length - 1]
    }`.toLocaleUpperCase();
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getState(): TaskState {
    return this.state;
  }

  getCreationDate(): Date {
    return this.creationDate;
  }

  getIsHidden(): boolean {
    return this.isHidden;
  }

  setIsHidden(isHidden: boolean): void {
    this.isHidden = isHidden;
  }

  protected setState(state: TaskState): void {
    this.state = state;
  }
}

export class PendingTask extends Task {
  constructor(title: string, description: string, creationDate?: Date, id?: string) {
    super(title, description, new NotStartedTaskState(), creationDate, id);
  }
}

export class StartedTask extends Task {
  private startDate: Date;

  constructor(
    title: string,
    description: string,
    state: InProgressTaskState | SuspendedTaskState,
    startDate: Date,
    creationDate?: Date,
    id?: string,
  ) {
    super(title, description, state, creationDate, id);

    this.startDate = startDate;
  }

  static fromPendingTask(
    pendingTask: PendingTask,
    state: InProgressTaskState | SuspendedTaskState,
    startDate: Date,
  ): StartedTask {
    return new StartedTask(
      pendingTask.getTitle(),
      pendingTask.getDescription(),
      state,
      startDate,
      pendingTask.getCreationDate(),
      pendingTask.getId(),
    );
  }

  getStartDate(): Date {
    return new Date(this.startDate);
  }
}

export class EndedTask extends StartedTask {
  private endDate: Date;

  constructor(
    title: string,
    description: string,
    state: CompletedTaskState | RejectedTaskState,
    startDate: Date,
    endDate: Date,
    creationDate?: Date,
    id?: string,
  ) {
    super(title, description, new InProgressTaskState(), startDate, creationDate, id);

    this.setState(state);
    this.endDate = endDate;
  }

  static fromStartedTask(
    startedTask: StartedTask,
    state: CompletedTaskState | RejectedTaskState,
    endDate: Date,
  ): EndedTask {
    return new EndedTask(
      startedTask.getTitle(),
      startedTask.getDescription(),
      state,
      startedTask.getStartDate(),
      endDate,
      startedTask.getCreationDate(),
      startedTask.getId(),
    );
  }

  getEndDate(): Date {
    return new Date(this.endDate);
  }
}
