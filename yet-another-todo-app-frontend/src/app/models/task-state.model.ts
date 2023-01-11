import {
  COLOR_ACCENT,
  COLOR_DANGER,
  COLOR_DISABLED,
  COLOR_TEXT,
  COLOR_WARN,
} from '../shared/theme';

enum TaskStateValue {
  NotStarted = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED',
}

export abstract class TaskState {
  private value: TaskStateValue;
  private iconName: string;
  private color: string;
  private tooltipText: string;

  constructor(value: TaskStateValue, iconName: string, color: string, tooltipText: string) {
    this.value = value;
    this.iconName = iconName;
    this.color = color;
    this.tooltipText = tooltipText;
  }

  toString(): TaskStateValue {
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

export class TaskNotStarted extends TaskState {
  constructor() {
    super(TaskStateValue.NotStarted, 'auto_awesome', COLOR_DISABLED, 'Task not started');
  }
}

export class TaskInProgress extends TaskState {
  constructor() {
    super(TaskStateValue.InProgress, 'autorenew', COLOR_DANGER, 'Task in progress');
  }
}

export class TaskCompleted extends TaskState {
  constructor() {
    super(TaskStateValue.Completed, 'task_alt', COLOR_ACCENT, 'Task is completed');
  }
}

export class TaskRejected extends TaskState {
  constructor() {
    super(TaskStateValue.Rejected, 'not_interested', COLOR_WARN, 'Task rejected');
  }
}

export class TaskSuspended extends TaskState {
  constructor() {
    super(TaskStateValue.Suspended, 'hourglass_empty', COLOR_TEXT, 'Task is suspended');
  }
}
