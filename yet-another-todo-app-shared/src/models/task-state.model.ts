import {
  SUCCESS_COLOR,
  DANGER_COLOR,
  DISABLED_COLOR,
  STANDARD_TEXT_COLOR,
  WARNING_COLOR,
} from '../styles/theme.__generated';
import { v4 as uuidv4 } from 'uuid';

export abstract class TaskState {
  private id: string;
  private value: string;
  private iconName: string;
  private color: string;

  constructor(value: string, iconName: string, color: string, id?: string) {
    this.id = id || uuidv4();
    this.value = value;
    this.iconName = iconName;
    this.color = color;
  }

  toString(): string {
    return this.value;
  }

  getId(): string {
    return this.id;
  }

  getRelatedIconName(): string {
    return this.iconName;
  }

  getRelatedColor(): string {
    return this.color;
  }
}

export class NotStartedTaskState extends TaskState {
  constructor(id?: string) {
    super(
      'NOT_STARTED',
      'auto_awesome',
      DISABLED_COLOR,
      id || '386db121-e9b7-4801-856a-10af38cc54d7',
    );
  }
}

export class InProgressTaskState extends TaskState {
  constructor(id?: string) {
    super('IN_PROGRESS', 'autorenew', WARNING_COLOR, id || '17fc6138-53c6-41d9-b3dd-83ef2ed032ab');
  }
}

export class SuspendedTaskState extends TaskState {
  constructor(id?: string) {
    super(
      'SUSPENDED',
      'hourglass_empty',
      STANDARD_TEXT_COLOR,
      id || '704b0396-f363-4981-b3f9-672620a4f959',
    );
  }
}

export class CompletedTaskState extends TaskState {
  constructor(id?: string) {
    super('COMPLETED', 'task_alt', SUCCESS_COLOR, id || '09be771f-6df5-465e-a77a-0c002ca51278');
  }
}

export class RejectedTaskState extends TaskState {
  constructor(id?: string) {
    super('REJECTED', 'not_interested', DANGER_COLOR, id || '0ee65977-e7ff-4f94-aeb3-1b395b808637');
  }
}
