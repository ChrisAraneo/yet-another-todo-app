import {
  COLOR_ACCENT,
  COLOR_DANGER,
  COLOR_DISABLED,
  COLOR_TEXT,
  COLOR_WARNING,
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
    super('NOT_STARTED', 'auto_awesome', COLOR_DISABLED);
  }
}

export class InProgressTaskState extends TaskState {
  constructor() {
    super('IN_PROGRESS', 'autorenew', COLOR_WARNING);
  }
}

export class SuspendedTaskState extends TaskState {
  constructor() {
    super('SUSPENDED', 'hourglass_empty', COLOR_TEXT);
  }
}

export class CompletedTaskState extends TaskState {
  constructor() {
    super('COMPLETED', 'task_alt', COLOR_ACCENT);
  }
}

export class RejectedTaskState extends TaskState {
  constructor() {
    super('REJECTED', 'not_interested', COLOR_DANGER);
  }
}
