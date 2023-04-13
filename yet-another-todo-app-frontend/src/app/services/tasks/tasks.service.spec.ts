import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { Task } from '../../models/task.model';
import { ApiClientService } from '../api-client/api-client.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  const dummyTasks: Task[] = [
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

  let service: TasksService;
  let unhiddenDummyTasks: Task[];
  let hiddenDummyTasks: Task[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockProvider(ApiClientService, {}),
        MockProvider(Store, {
          select: (key: any) => {
            if (key === 'tasks') {
              return of([...dummyTasks]);
            }
            return of(undefined);
          },
        }),
        TasksService,
      ],
    });

    service = TestBed.inject(TasksService);
    unhiddenDummyTasks = dummyTasks.filter((task) => !task.getIsHidden());
    hiddenDummyTasks = dummyTasks.filter((task) => task.getIsHidden());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTasks should return array of unhidden Tasks', () => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(unhiddenDummyTasks);
    });
  });

  it('#getHiddenTasks should return array of hidden Tasks', () => {
    service.getHiddenTasks().subscribe((tasks) => {
      expect(tasks).toEqual(hiddenDummyTasks);
    });
  });
});
