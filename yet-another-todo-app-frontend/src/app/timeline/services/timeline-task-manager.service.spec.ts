import { TestBed } from '@angular/core/testing';
import {
  CompletedTaskState,
  EndedTask,
  InProgressTaskState,
  NotStartedTaskState,
  PendingTask,
  RejectedTaskState,
  StartedTask,
  SuspendedTaskState,
} from '../../../../../yet-another-todo-app-shared';
import { TimelineTaskManagerService } from './timeline-task-manager.service';

describe('TimelineTaskManagerService', () => {
  const notStartedTask1 = new PendingTask(
    'Not started task 1',
    'Description',
    new Date(2021, 3, 4, 2, 12, 1),
    'c79e8bcd-613f-4b11-a0ae-ff40df432dad',
  );
  const notStartedTask2 = new PendingTask(
    'Not started task 2',
    'Description',
    new Date(2021, 3, 4, 5, 55, 28),
    '37e8fbcf-7e79-444f-9739-644e44821f42',
  );
  const inProgressTask1 = new StartedTask(
    'In progress 1',
    'Lorem ipsum',
    new InProgressTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 14, 10, 27),
    'a0ce7f3e-e0c9-48f2-a48d-203151757a4b',
  );
  const inProgressTask2 = new StartedTask(
    'In progress 2',
    'Lorem ipsum',
    new InProgressTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 15, 22, 3),
    '44b6d793-6cff-4aac-9319-904d7a187d66',
  );
  const suspendedTask1 = new StartedTask(
    'Suspended task 1',
    'Lorem ipsum',
    new SuspendedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 16, 10, 54),
    '4b746455-ffe0-4a4e-8299-20a8cdf8868f',
  );
  const suspendedTask2 = new StartedTask(
    'Suspended task 2',
    'Lorem ipsum',
    new SuspendedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 16, 10, 54),
    'd4589bf5-0595-4693-b034-bacea12b0187',
  );
  const completedTask1 = new EndedTask(
    'Completed task 1',
    'Lorem ipsum',
    new CompletedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 9, 11, 36),
    'da34ee8c-2d8e-4a6d-8ca7-4ff5cbae6ed8',
  );
  const completedTask2 = new EndedTask(
    'Completed task 2',
    'Lorem ipsum',
    new CompletedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 5),
    new Date(2021, 3, 4, 22, 56, 14),
    'f6e0e4d1-bee9-4bb6-b1f4-4d591ee9d3ac',
  );
  const rejectedTask1 = new EndedTask(
    'Rejected task 1',
    'Lorem ipsum',
    new RejectedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4),
    new Date(2021, 3, 4, 2, 34, 43),
    '09bbb882-5f27-48d4-901f-f08629d1f378',
  );
  const rejectedTask2 = new EndedTask(
    'Rejected task 2',
    'Lorem ipsum',
    new RejectedTaskState(),
    new Date(2021, 3, 4),
    new Date(2021, 3, 5),
    new Date(2021, 3, 4, 5, 32, 31),
    'd8e9938b-625d-4438-9f95-b3f9ed61c202',
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
      suspendedTask1,
      suspendedTask2,
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
      suspendedTask1,
      suspendedTask2,
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
      suspendedTask1,
      suspendedTask2,
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
      suspendedTask1,
      suspendedTask2,
      inProgressTask2,
      inProgressTask1,
      completedTask1,
      notStartedTask2,
      notStartedTask1,
    ]);
  });

  it('#mapTasksToTimelineColumns should return empty array when there are no tasks in selected period', () => {
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

  it('#mapTasksToTimelineColumns should return array with columns having proper left margins', () => {
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
      new Date(2021, 3, 30),
      new Date(2021, 3, 1),
      new Date(2021, 3, 31),
      filter,
      order,
    );

    expect(result[0].leftMargin).toEqual(3);

    expect(result[1].leftMargin).toEqual(0);
  });
});
