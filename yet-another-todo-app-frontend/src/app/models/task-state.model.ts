import {
  COLOR_ACCENT,
  COLOR_DANGER,
  COLOR_DISABLED,
  COLOR_TEXT,
  COLOR_WARN,
} from '../shared/theme';

export abstract class TaskState {
  private value: string;
  private iconName: string;
  private color: string;
  private tooltipText: string;

  constructor(value: string, iconName: string, color: string, tooltipText: string) {
    this.value = value;
    this.iconName = iconName;
    this.color = color;
    this.tooltipText = tooltipText;
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

  getRelatedTooltipText(): string {
    return this.tooltipText;
  }
}

export class NotStartedTaskState extends TaskState {
  constructor() {
    super('NOT_STARTED', 'auto_awesome', COLOR_DISABLED, 'Task not started');
  }
}

export class InProgressTaskState extends TaskState {
  constructor() {
    super('IN_PROGRESS', 'autorenew', COLOR_DANGER, 'Task in progress');
  }
}

export class SuspendedTaskState extends TaskState {
  constructor() {
    super('SUSPENDED', 'hourglass_empty', COLOR_TEXT, 'Task is suspended');
  }
}

export class CompletedTaskState extends TaskState {
  constructor() {
    super('COMPLETED', 'task_alt', COLOR_ACCENT, 'Task is completed');
  }
}

export class RejectedTaskState extends TaskState {
  constructor() {
    super('REJECTED', 'not_interested', COLOR_WARN, 'Task rejected');
  }
}
