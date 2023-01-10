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
    super(TaskStateValue.NotStarted, 'auto_awesome', 'darkgrey', 'Task not started');
  }
}

export class TaskInProgress extends TaskState {
  constructor() {
    super(TaskStateValue.InProgress, 'autorenew', 'orange', 'Task in progress');
  }
}

export class TaskCompleted extends TaskState {
  constructor() {
    super(TaskStateValue.Completed, 'task_alt', 'green', 'Task is completed');
  }
}

export class TaskRejected extends TaskState {
  constructor() {
    super(TaskStateValue.Rejected, 'not_interested', 'red', 'Task rejected');
  }
}

export class TaskSuspended extends TaskState {
  constructor() {
    super(TaskStateValue.Suspended, 'hourglass_empty', 'black', 'Task is suspended');
  }
}
