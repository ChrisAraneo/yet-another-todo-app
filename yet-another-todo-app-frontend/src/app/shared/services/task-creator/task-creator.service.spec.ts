import { TestBed } from '@angular/core/testing';
import { EndedTask, PendingTask, StartedTask, Task } from 'src/app/shared/models/task.model';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
} from '../../models/task-state.model';
import { TaskCreatorService } from './task-creator.service';

describe('TaskCreatorService', () => {
  let service: TaskCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#create with correct pending task data input should create instance of PendingTask', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    const createdObject = service.create(data);

    expect(createdObject).toBeInstanceOf(PendingTask);
  });

  it('#create with correct started task data input should create instance of StartedTask', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new InProgressTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
      startDate: new Date(2000, 1, 3).toISOString(),
    };

    const createdObject = service.create(data);

    expect(createdObject).toBeInstanceOf(StartedTask);
  });

  it('#create with correct ended task data input should create instance of EndedTask', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new CompletedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
      startDate: new Date(2000, 1, 3).toISOString(),
      endDate: new Date(2000, 1, 10).toISOString(),
    };

    const createdObject = service.create(data);

    expect(createdObject).toBeInstanceOf(EndedTask);
  });

  it('#create with input not having an id should create a Task instance', () => {
    const data = {
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    const createdObject = service.create(data);

    expect(createdObject).toBeInstanceOf(Task);
  });

  it('#create with input having an empty id should create a Task instance', () => {
    const data = {
      id: '',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    const createdObject = service.create(data);

    expect(createdObject).toBeInstanceOf(Task);
  });

  it('#create with input not having a title should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      description: 'ipsum',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with input having an empty title should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: '',
      description: 'ipsum',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with input not having a description should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with input having an empty description should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: '',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with input having incorrect creation date should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new NotStartedTaskState().toString(),
      },
      creationDate: 'here-should-be-correct-date-string',
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with input not having creation date should throw and error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new NotStartedTaskState().toString(),
      },
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with input having incorrect state should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: 'incorrect-state',
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with started task data input having incorrect start date should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new InProgressTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
      startDate: 'this-should-be-a-correct-string-date',
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });

  it('#create with ended task data input having incorrect end date should throw an error', () => {
    const data = {
      id: '6cc2a9fa-dcdd-4e95-b5f9-d3681f3e9933',
      title: 'lorem',
      description: 'ipsum',
      state: {
        value: new CompletedTaskState().toString(),
      },
      creationDate: new Date(2000, 1, 2).toISOString(),
      startDate: new Date(2000, 1, 3).toISOString(),
      endDate: 'this-is-incorrect-date-string',
    };

    expect(() => service.create(data)).toThrowError(/[^]+/);
  });
});
