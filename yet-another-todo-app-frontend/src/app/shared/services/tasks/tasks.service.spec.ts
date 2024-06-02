import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { first, of } from 'rxjs';
import { ImportAction } from 'src/app/modals/components/import-tasks-modal/select-import-action-modal/select-import-action-modal.types';
import { TaskCreator } from '../../../../../../yet-another-todo-app-shared/src/models/task-creator.model';
import { CompletedTaskState } from '../../models/task-state.model';
import { TaskTransformer } from '../../../../../../yet-another-todo-app-shared/src/models/task-transformer.model';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import {
  sendCreateTaskRequest,
  sendHideTaskRequest,
  sendUpdateTaskRequest,
  sendUpdateTasksRequest,
} from '../../store/actions/task.actions';
import { initialState as httpLogInitialState } from '../../store/reducers/http-log.reducer';
import { ApiClientService } from '../api-client/api-client.service';
import { OperationIdGeneratorService } from '../operation-id-generator/operation-id-generator.service';
import { UserService } from '../user/user.service';
import { TasksService } from './tasks.service';

// TODO Update imports

describe('TasksService', () => {
  let service: TasksService;
  let store: Store;

  let dummyOperationId: string;
  let dummyTasks: Task[];
  let dummyTasks2: Task[];
  let dummyTasks3: Task[];
  let unhiddenDummyTasks: Task[];
  let hiddenDummyTasks: Task[];

  beforeEach(() => {
    dummyOperationId = '-';
    dummyTasks = [
      {
        id: 'fa722506-6b8b-4842-a6fe-b5fe65d7468b',
        title: 'test',
        description: 'test description',
        state: {
          value: 'COMPLETED',
          iconName: 'task_alt',
          color: '#69f0ae',
        },
        isHidden: true,
        creationDate: '2023-04-04T21:47:33.277Z',
        startDate: '2023-04-04T00:00:00.000Z',
        endDate: '2023-04-04T21:47:59.338Z',
      },
      {
        id: '0195e2f0-32aa-4835-9b80-52a6fa52bce2',
        title: 'lorem',
        description: 'ipsum',
        state: {
          value: 'IN_PROGRESS',
          iconName: 'autorenew',
          color: 'orange',
        },
        isHidden: false,
        creationDate: '2023-04-08T11:53:40.986Z',
        startDate: '2023-04-08T00:00:00.000Z',
        endDate: null,
      },
      {
        id: '838eb336-a0ad-4337-aae5-cf6864cf377e',
        title: 'dummy',
        description: 'dolor es',
        state: {
          value: 'COMPLETED',
          iconName: 'task_alt',
          color: '#69f0ae',
        },
        isHidden: false,
        creationDate: '2023-04-01T21:47:44.844Z',
        startDate: '2023-04-01T00:00:00.000Z',
        endDate: '2023-04-01T00:00:00.000Z',
      },
    ].map((item) => TaskCreator.create(item));
    dummyTasks2 = [
      {
        id: 'fa722506-6b8b-4842-a6fe-b5fe65d7468b',
        title: 'test (changed)',
        description: 'test description (changed)',
        state: {
          value: 'COMPLETED',
          iconName: 'task_alt',
          color: '#69f0ae',
        },
        isHidden: true,
        creationDate: '2023-04-04T21:47:33.277Z',
        startDate: '2023-04-04T00:00:00.000Z',
        endDate: '2023-04-04T21:47:59.338Z',
      },
      {
        id: '0195e2f0-32aa-4835-9b80-52a6fa52bce2',
        title: 'lorem',
        description: 'ipsum',
        state: {
          value: 'IN_PROGRESS',
          iconName: 'autorenew',
          color: 'orange',
        },
        isHidden: false,
        creationDate: '2023-04-08T11:53:40.986Z',
        startDate: '2023-04-08T00:00:00.000Z',
        endDate: null,
      },
      {
        id: '838eb336-a0ad-4337-aae5-cf6864cf377e',
        title: 'dummy',
        description: 'dolor es',
        state: {
          value: 'COMPLETED',
          iconName: 'task_alt',
          color: '#69f0ae',
        },
        isHidden: false,
        creationDate: '2023-04-01T21:47:44.844Z',
        startDate: '2023-04-01T00:00:00.000Z',
        endDate: '2023-04-01T00:00:00.000Z',
      },
      {
        id: '89f981d3-0cf4-467f-a9d2-7c495500b069',
        title: 'newly added',
        description: 'this task was added',
        state: {
          value: 'COMPLETED',
          iconName: 'task_alt',
          color: '#69f0ae',
        },
        isHidden: false,
        creationDate: '2023-07-12T20:16:55.121Z',
        startDate: '2023-07-13T00:00:00.000Z',
        endDate: '2023-08-10T00:00:00.000Z',
      },
    ].map((item) => TaskCreator.create(item));
    dummyTasks3 = [
      {
        id: '5a4eb1c4-f715-47d1-a515-d3f337120d9e',
        title: 'Aa Bb Cc',
        description: 'Vestibulum ante ipsum primis in.',
        state: {
          value: 'IN_PROGRESS',
          iconName: 'autorenew',
          color: 'orange',
        },
        isHidden: false,
        creationDate: '2021-01-01T11:53:40.986Z',
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: null,
      },
    ].map((item) => TaskCreator.create(item));
    unhiddenDummyTasks = dummyTasks.filter((task) => !task.getIsHidden());
    hiddenDummyTasks = dummyTasks.filter((task) => task.getIsHidden());

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockProvider(ApiClientService, {
          fetchTasksFromApi: () => new Promise((resolve) => resolve([])),
        }),
        MockProvider(UserService, {
          getIsUserLogged: () => of(true),
          getIsOfflineMode: () => of(false),
        }),
        MockProvider(OperationIdGeneratorService, {
          generate: () => dummyOperationId,
        }),
        MockProvider(Store, {
          select: (key: any) => {
            if (key === 'tasks') {
              return of([...dummyTasks]);
            } else if (key === 'httpLog') {
              return of({ ...httpLogInitialState });
            }
            return of(undefined);
          },
        }),
        TasksService,
      ],
    });

    service = TestBed.inject(TasksService);
    store = service.store;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTasks should return array of unhidden Tasks', () => {
    service
      .getTasks()
      .subscribe((tasks) => {
        expect(tasks).toEqual(unhiddenDummyTasks);
      })
      .unsubscribe();
  });

  it('#getHiddenTasks should return array of hidden Tasks', () => {
    service
      .getHiddenTasks()
      .subscribe((tasks) => {
        expect(tasks).toEqual(hiddenDummyTasks);
      })
      .unsubscribe();
  });

  it('#addTask should dispatch create task request action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const task = dummyTasks[0];
    const action = sendCreateTaskRequest({ task, operationId: dummyOperationId });

    service.addTask(task).subscribe().unsubscribe();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#updateTask should dispatch update task request action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const task = dummyTasks[0];
    const action = sendUpdateTaskRequest({ task, operationId: dummyOperationId });

    service.updateTask(task).subscribe().unsubscribe();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#completeTask should dispatch update task request action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const task: StartedTask = dummyTasks.find(
      (task) => task instanceof StartedTask && !(task instanceof EndedTask),
    ) as StartedTask;
    const now = new Date();
    const updatedTask: EndedTask = TaskTransformer.transform(task, {
      state: new CompletedTaskState(),
      endDate: now,
    }) as EndedTask;
    const action = sendUpdateTaskRequest({ task: updatedTask, operationId: dummyOperationId });

    service.completeTask(task, now).subscribe().unsubscribe();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#hideTask should dispatch hide task request action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const task = dummyTasks[0];
    const action = sendHideTaskRequest({ id: task.getId(), operationId: dummyOperationId });

    service.hideTask(task.getId()).subscribe().unsubscribe();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#importTasks should dispatch update tasks request action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const tasks = dummyTasks;
    const action = sendUpdateTasksRequest({ tasks, operationId: dummyOperationId });

    service.importTasks(tasks, ImportAction.AddNewAndSkipExisting).pipe(first()).subscribe();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#importTasks should return task array with new tasks added and already existing ones unchanged', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const existingTasks = dummyTasks;
    const inputTasks = dummyTasks2;
    const outputTasks = [existingTasks[0], existingTasks[1], existingTasks[2], inputTasks[3]];
    const action = sendUpdateTasksRequest({ tasks: outputTasks, operationId: dummyOperationId });

    service.importTasks(inputTasks, ImportAction.AddNewAndSkipExisting).pipe(first()).subscribe();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#importTasks should return task array with tasks provided as input as unhidden and already existing ones hidden', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const existingTasks = dummyTasks;
    const inputTasks = dummyTasks3;
    const outputTasks = [
      TaskTransformer.transform(existingTasks[0], { isHidden: true }),
      TaskTransformer.transform(existingTasks[1], { isHidden: true }),
      TaskTransformer.transform(existingTasks[2], { isHidden: true }),
      dummyTasks3[0],
    ];
    const action = sendUpdateTasksRequest({ tasks: outputTasks, operationId: dummyOperationId });

    service.importTasks(inputTasks, ImportAction.ReplaceDataSet).pipe(first()).subscribe();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
