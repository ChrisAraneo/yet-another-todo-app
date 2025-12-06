import { v4 as uuidv4 } from 'uuid';

export abstract class TaskState {
  private readonly id: string;
  private readonly value: string;
  private readonly iconName: string;

  constructor(value: string, iconName: string, id?: string) {
    this.id = id || uuidv4();
    this.value = value;
    this.iconName = iconName;
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
}

export class NotStartedTaskState extends TaskState {
  constructor(id?: string) {
    super(
      'NOT_STARTED',
      'auto_awesome',
      id || '386db121-e9b7-4801-856a-10af38cc54d7',
    );
  }
}

export class InProgressTaskState extends TaskState {
  constructor(id?: string) {
    super(
      'IN_PROGRESS',
      'autorenew',
      id || '17fc6138-53c6-41d9-b3dd-83ef2ed032ab',
    );
  }
}

export class SuspendedTaskState extends TaskState {
  constructor(id?: string) {
    super(
      'SUSPENDED',
      'hourglass_empty',
      id || '704b0396-f363-4981-b3f9-672620a4f959',
    );
  }
}

export class CompletedTaskState extends TaskState {
  constructor(id?: string) {
    super(
      'COMPLETED',
      'task_alt',
      id || '09be771f-6df5-465e-a77a-0c002ca51278',
    );
  }
}

export class RejectedTaskState extends TaskState {
  constructor(id?: string) {
    super(
      'REJECTED',
      'not_interested',
      id || '0ee65977-e7ff-4f94-aeb3-1b395b808637',
    );
  }
}
