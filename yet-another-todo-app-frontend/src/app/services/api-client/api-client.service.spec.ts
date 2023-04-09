import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { environment } from 'src/environments/environment';
import { Task } from '../../models/task.model';
import { ApiClientService } from './api-client.service';
import { ApiResponse, ApiResponseStatus, TaskData } from './api-client.types';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;
  let dummyResponseData: TaskData[];
  let dummyTasks: Task[];
  let dummyTask: Task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'API', useValue: environment.api }, ApiClientService],
    });
    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
    dummyResponseData = [
      {
        title: 'Lorem ipsum',
        description: 'Description...',
        state: {
          value: 'IN_PROGRESS',
          iconName: 'autorenew',
          color: 'orange',
        },
        creationDate: '2023-02-01T22:50:45.959Z',
        id: '2f1f0392-bf60-40ed-9d01-2b7e2bf7c819',
        startDate: '2023-01-01T00:00:00.000Z',
      },
      {
        title: 'Abra kadabra',
        description: 'Dolor es...',
        state: {
          value: 'SUSPENDED',
          iconName: 'hourglass_empty',
          color: 'black',
        },
        creationDate: '2023-02-06T19:38:33.345Z',
        id: '2b3f690b-7a65-4e03-b042-467dd758ac6f',
        startDate: '2023-01-01T00:00:00.000Z',
      },
    ];
    dummyTasks = dummyResponseData.map((item) => TaskCreator.create(item));
    dummyTask = dummyTasks[0];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchTasksFromApi should return an Observable<Task[]> on successful response', () => {
    const dummySuccessResponse: ApiResponse<TaskData[]> = {
      status: ApiResponseStatus.Success,
      data: dummyResponseData,
    };

    service.fetchTasksFromApi().subscribe((tasks) => {
      expect(tasks?.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySuccessResponse);
  });

  it('#fetchTasksFromApi should return an Observable<undefined> on error response', () => {
    const dummyErrorResponse: ApiResponse<TaskData[]> = {
      status: ApiResponseStatus.Error,
      data: null,
      message: 'Error message',
    };

    service.fetchTasksFromApi().subscribe((tasks) => {
      expect(tasks).toEqual(undefined);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyErrorResponse);
  });

  it('#fetchTasksFromApi should return an Observable<undefined> on invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.fetchTasksFromApi().subscribe((tasks) => {
      expect(tasks).toEqual(undefined);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(invalidResponse);
  });

  it('#postTaskToApi should handle success response', () => {
    const dummySuccessResponse: ApiResponse<TaskData> = {
      status: ApiResponseStatus.Success,
      data: dummyResponseData[0],
    };

    service.postTaskToApi(dummyTask).subscribe((task) => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/task`);
    expect(req.request.method).toBe('POST');
    req.flush(dummySuccessResponse);
  });

  it('#postTaskToApi should handle error response', () => {
    service.postTaskToApi(dummyTask).subscribe((task) => {
      expect(task).toEqual(undefined);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/task`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: ApiResponseStatus.Error,
      data: null,
    });
  });

  it('#postTaskToApi should handle invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.postTaskToApi(dummyTask).subscribe((task) => {
      expect(task).toEqual(undefined);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/task`);
    expect(req.request.method).toBe('POST');
    req.flush(invalidResponse);
  });
});
