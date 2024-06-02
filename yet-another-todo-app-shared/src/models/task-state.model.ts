import {
  SUCCESS_COLOR,
  DANGER_COLOR,
  DISABLED_COLOR,
  STANDARD_TEXT_COLOR,
  WARNING_COLOR,
} from '../styles/theme.__generated';

export abstract class TaskState {
  private value: string;
  private iconName: string;
  private color: string;

  constructor(value: string, iconName: string, color: string) {
    this.value = value;
    this.iconName = iconName;
    this.color = color;
  }

  toString(): string {
    return this.value;
  }

  getRelatedIconName(): string {
    return this.iconName;
  }

  getRelatedColor(): string {
    return this.color;
  }
}

export class NotStartedTaskState extends TaskState {
  constructor() {
    super('NOT_STARTED', 'auto_awesome', DISABLED_COLOR);
  }
}

export class InProgressTaskState extends TaskState {
  constructor() {
    super('IN_PROGRESS', 'autorenew', WARNING_COLOR);
  }
}

export class SuspendedTaskState extends TaskState {
  constructor() {
    super('SUSPENDED', 'hourglass_empty', STANDARD_TEXT_COLOR);
  }
}

export class CompletedTaskState extends TaskState {
  constructor() {
    super('COMPLETED', 'task_alt', SUCCESS_COLOR);
  }
}

export class RejectedTaskState extends TaskState {
  constructor() {
    super('REJECTED', 'not_interested', DANGER_COLOR);
  }
}
