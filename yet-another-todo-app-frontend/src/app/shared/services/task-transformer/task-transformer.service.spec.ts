import { TestBed } from '@angular/core/testing';
import {
  CompletedTaskState,
  EndedTask,
  InProgressTaskState,
  PendingTask,
  StartedTask,
} from '../../../../../../yet-another-todo-app-shared';
import { TaskTransformerService } from './task-transformer.service';

describe('TaskTransformerService', () => {
  const notStartedTask = new PendingTask(
    'Lorem ipsum',
    'Dolor es',
    new Date(2022, 2, 3),
    '3889595a-630b-402e-a171-01df7acfc956',
  );
  const inProgressTask = new StartedTask(
    'Lorem ipsum',
    'Dolor es',
    new InProgressTaskState(),
    new Date(2022, 2, 3),
    new Date(2022, 2, 2),
    '3889595a-630b-402e-a171-01df7acfc956',
  );
  const completedTask = new EndedTask(
    'Lorem ipsum',
    'Dolor es',
    new CompletedTaskState(),
    new Date(2022, 2, 3),
    new Date(2022, 2, 4),
    new Date(2022, 2, 2),
    '3889595a-630b-402e-a171-01df7acfc956',
  );
  let service: TaskTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#transform should return new instance with the same property values', () => {
    const result = service.transform(notStartedTask, {});

    expect(result).toBeInstanceOf(PendingTask);
    expect(notStartedTask !== result).toBeTrue();
  });

  it('#transform should return new instance with changed title', () => {
    const result = service.transform(notStartedTask, { title: 'Test' });

    expect(result.getTitle()).toEqual('Test');
  });

  it('#transform should return new instance with changed description', () => {
    const result = service.transform(notStartedTask, { description: 'Test' });

    expect(result.getDescription()).toEqual('Test');
  });

  it('#transform should return new instance with changed creationDate', () => {
    const creationDate = new Date(2012, 4, 12);

    const result = service.transform(notStartedTask, { creationDate });

    expect(result.getCreationDate()).toEqual(creationDate);
  });

  it('#transform should return new instance with changed id', () => {
    const id = '123';

    const result = service.transform(notStartedTask, { id });

    expect(result.getId()).toEqual(id);
  });

  it('#transform should return new instance with changed isHidden', () => {
    const result = service.transform(notStartedTask, { isHidden: true });

    expect(result.getIsHidden()).toEqual(true);
  });

  it('#transform should return new started task instance', () => {
    const state = new InProgressTaskState();
    const startDate = new Date(1999, 5, 22);

    const result = service.transform(notStartedTask, { state, startDate });

    expect(result).toBeInstanceOf(StartedTask);
  });

  it('#transform should return new instance with changed startDate', () => {
    const startDate = new Date(1999, 5, 22);

    const result = service.transform(inProgressTask, { startDate });

    expect((result as StartedTask).getStartDate()).toEqual(startDate);
  });

  it('#transform should return new ended task instance', () => {
    const state = new CompletedTaskState();
    const endDate = new Date(2023, 10, 11);

    const result = service.transform(inProgressTask, { state, endDate });

    expect(result).toBeInstanceOf(EndedTask);
  });

  it('#transform should return new instance with changed endDate', () => {
    const endDate = new Date(2023, 10, 11);
    const result = service.transform(completedTask, { endDate });

    expect((result as EndedTask).getEndDate()).toEqual(endDate);
  });
});
