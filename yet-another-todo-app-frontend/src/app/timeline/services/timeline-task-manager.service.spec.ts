import { TestBed } from '@angular/core/testing';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
} from 'src/app/shared/models/task-state.model';
import { EndedTask, PendingTask, StartedTask } from 'src/app/shared/models/task.model';
import { TimelineTaskManagerService } from './timeline-task-manager.service';

describe('TimelineTaskManagerService', () => {
  const notStartedTask1 = new PendingTask(
    'Not started task 1',
    'Description',
    new Date(2021, 3, 4, 2, 12, 1),
  );
  const notStartedTask2 = new PendingTask(
    'Not started task 2',
    'Description',
    new Date(2021, 3, 4, 5, 55, 28),
  );
  const inProgressTask1 = new StartedTask(
    'In progress 1',
    'Lorem ipsum',
    new InProgressTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 14, 10, 27),
  );
  const inProgressTask2 = new StartedTask(
    'In progress 2',
    'Lorem ipsum',
    new InProgressTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 15, 22, 3),
  );
  const suspendedTask1 = new StartedTask(
    'Suspended task 1',
    'Lorem ipsum',
    new SuspendedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 16, 10, 54),
  );
  const suspendedTask2 = new StartedTask(
    'Suspended task 2',
    'Lorem ipsum',
    new SuspendedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 17, 8, 4),
  );
  const completedTask1 = new EndedTask(
    'Completed task 1',
    'Lorem ipsum',
    new CompletedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 9, 11, 36),
  );
  const completedTask2 = new EndedTask(
    'Completed task 2',
    'Lorem ipsum',
    new CompletedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 5),
    new Date(2021, 3, 4, 22, 56, 14),
  );
  const rejectedTask1 = new EndedTask(
    'Rejected task 1',
    'Lorem ipsum',
    new RejectedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 2, 34, 43),
  );
  const rejectedTask2 = new EndedTask(
    'Rejected task 2',
    'Lorem ipsum',
    new RejectedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 5),
    new Date(2021, 3, 4, 5, 32, 31),
  );

  const dummyTasks = [
    notStartedTask1,
    notStartedTask2,
    inProgressTask1,
    inProgressTask2,
    suspendedTask1,
    suspendedTask2,
    completedTask1,
    completedTask2,
    rejectedTask1,
    rejectedTask2,
  ].sort((a, b) => b.getCreationDate().valueOf() - a.getCreationDate().valueOf());

  let service: TimelineTaskManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineTaskManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#mapTasksToTimelineColumns should return empty column array when filter array is empty', () => {
    const order = [new NotStartedTaskState(), new InProgressTaskState()];
    const result = service.mapTasksToTimelineColumns(
      dummyTasks,
      new Date(2021, 3, 4),
      new Date(2021, 3, 4),
      new Date(2021, 3, 4),
      [],
      order,
    );

    expect(result.length).toEqual(0);
  });

  it('#mapTasksToTimelineColumns should throw error when start date is after end date', () => {
    expect(() =>
      service.mapTasksToTimelineColumns(
        dummyTasks,
        new Date(2021, 3, 7),
        new Date(2021, 3, 7),
        new Date(2021, 3, 1),
        [],
        [],
      ),
    ).toThrowError(/[^]+/);
  });

  it('#mapTasksToTimelineColumns should return one column with tasks ordered by state and creation date', () => {
    const filter = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const order = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const result = service.mapTasksToTimelineColumns(
      dummyTasks,
      new Date(2021, 3, 4),
      new Date(2021, 3, 4),
      new Date(2021, 3, 4),
      filter,
      order,
    );

    expect(result.length).toEqual(1);

    expect(result.map((item) => item.tasks)[0]).toEqual([
      notStartedTask2,
      notStartedTask1,
      inProgressTask2,
      inProgressTask1,
      completedTask1,
      suspendedTask2,
      suspendedTask1,
      rejectedTask1,
    ]);
  });

  it('#mapTasksToTimelineColumns should return two columns with tasks ordered by state and creation date', () => {
    const filter = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const order = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const result = service.mapTasksToTimelineColumns(
      dummyTasks,
      new Date(2021, 3, 5),
      new Date(2021, 3, 4),
      new Date(2021, 3, 5),
      filter,
      order,
    );

    expect(result.length).toEqual(2);

    expect(result.map((item) => item.tasks)[0]).toEqual([completedTask1, rejectedTask1]);

    expect(result.map((item) => item.tasks)[1]).toEqual([
      notStartedTask2,
      notStartedTask1,
      inProgressTask2,
      inProgressTask1,
      completedTask2,
      suspendedTask2,
      suspendedTask1,
      rejectedTask2,
    ]);
  });

  it("#mapTasksToTimelineColumns should return columns and all pending and not finished tasks are assigned to today's date", () => {
    const filter = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const order = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const result = service.mapTasksToTimelineColumns(
      dummyTasks,
      new Date(2021, 3, 20),
      new Date(2021, 3, 1),
      new Date(2021, 3, 25),
      filter,
      order,
    );

    expect(result.length).toEqual(3);

    expect(result.map((item) => item.tasks)[2]).toEqual([
      notStartedTask2,
      notStartedTask1,
      inProgressTask2,
      inProgressTask1,
      suspendedTask2,
      suspendedTask1,
    ]);
  });

  it('#mapTasksToTimelineColumns should return tasks in custom order', () => {
    const filter = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const order = [
      new RejectedTaskState(),
      new SuspendedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new NotStartedTaskState(),
    ];
    const result = service.mapTasksToTimelineColumns(
      dummyTasks,
      new Date(2021, 3, 4),
      new Date(2021, 3, 4),
      new Date(2021, 3, 4),
      filter,
      order,
    );

    expect(result.length).toEqual(1);

    expect(result.map((item) => item.tasks)[0]).toEqual([
      rejectedTask1,
      suspendedTask2,
      suspendedTask1,
      inProgressTask2,
      inProgressTask1,
      completedTask1,
      notStartedTask2,
      notStartedTask1,
    ]);
  });

  it('#mapTasksToTimelineColumns should return empty array when there is no tasks in selected period', () => {
    const filter = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const order = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const result = service.mapTasksToTimelineColumns(
      dummyTasks,
      new Date(1999, 10, 25),
      new Date(1999, 3, 1),
      new Date(1999, 3, 10),
      filter,
      order,
    );

    expect(result.length).toEqual(0);
  });

  it("#mapTasksToTimelineColumns should return column without any pending and not ended tasks when today's date is not in selected period", () => {
    const filter = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const order = [
      new NotStartedTaskState(),
      new InProgressTaskState(),
      new CompletedTaskState(),
      new SuspendedTaskState(),
      new RejectedTaskState(),
    ];
    const result = service.mapTasksToTimelineColumns(
      dummyTasks,
      new Date(2023, 10, 25),
      new Date(2021, 3, 1),
      new Date(2021, 3, 22),
      filter,
      order,
    );

    expect(result.length).toEqual(2);

    expect(result.map((item) => item.tasks)[0]).toEqual([completedTask1, rejectedTask1]);

    expect(result.map((item) => item.tasks)[1]).toEqual([completedTask2, rejectedTask2]);
  });
});
