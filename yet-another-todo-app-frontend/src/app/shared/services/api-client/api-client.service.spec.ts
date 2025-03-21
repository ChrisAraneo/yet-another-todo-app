import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Task, TaskCreator } from '../../../../../../yet-another-todo-app-shared';
import { LoginResponse, RefreshResponse } from '../auth/auth.types';
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
        isHidden: false,
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
        isHidden: false,
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

  it('#fetchTasksFromApi should return tasks on successful response', () => {
    const dummySuccessResponse: ApiResponse<TaskData[]> = {
      status: ApiResponseStatus.Success,
      data: dummyResponseData,
    };

    service.fetchTasksFromApi('-').then((tasks) => {
      expect(tasks?.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(environment.api.tasksEndpoint);
    expect(req.request.method).toBe('GET');
    req.flush(dummySuccessResponse);
  });

  it('#fetchTasksFromApi should reject promise on error response', () => {
    const dummyErrorResponse: ApiResponse<TaskData[]> = {
      status: ApiResponseStatus.Error,
      data: null,
      message: 'Error message',
    };

    service.fetchTasksFromApi('-').catch((error) => {
      expect(error).toEqual(dummyErrorResponse);
    });

    const req = httpMock.expectOne(environment.api.tasksEndpoint);
    expect(req.request.method).toBe('GET');
    req.flush(dummyErrorResponse);
  });

  it('#fetchTasksFromApi should reject promise on invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.fetchTasksFromApi('-').catch((error) => {
      expect(error).toEqual(invalidResponse);
    });

    const req = httpMock.expectOne(environment.api.tasksEndpoint);
    expect(req.request.method).toBe('GET');
    req.flush(invalidResponse);
  });

  it('#postTaskToApi should handle success response', () => {
    const dummySuccessResponse: ApiResponse<TaskData> = {
      status: ApiResponseStatus.Success,
      data: dummyResponseData[0],
    };

    service.postTaskToApi(dummyTask, '-').then((task) => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne(environment.api.taskEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(dummySuccessResponse);
  });

  it('#postTaskToApi should reject promise on error response', () => {
    const errorResponse = {
      status: ApiResponseStatus.Error,
      data: null,
    };

    service.postTaskToApi(dummyTask, '-').catch((error) => {
      expect(error).toEqual(errorResponse);
    });

    const req = httpMock.expectOne(environment.api.taskEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse);
  });

  it('#postTaskToApi should reject promise on invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.postTaskToApi(dummyTask, '-').catch((error) => {
      expect(error).toBe(invalidResponse);
    });

    const req = httpMock.expectOne(environment.api.taskEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(invalidResponse);
  });

  it('#postTasksToApi should handle success response', () => {
    const dummySuccessResponse: ApiResponse<TaskData[]> = {
      status: ApiResponseStatus.Success,
      data: dummyResponseData,
    };

    service.postTasksToApi(dummyTasks, '-').then((tasks) => {
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(environment.api.tasksEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(dummySuccessResponse);
  });

  it('#postTasksToApi should reject promise on error response', () => {
    const errorResponse = {
      status: ApiResponseStatus.Error,
      data: null,
    };

    service.postTasksToApi(dummyTasks, '-').catch((error) => {
      expect(error).toEqual(errorResponse);
    });

    const req = httpMock.expectOne(environment.api.tasksEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse);
  });

  it('#postTasksToApi should reject promise on invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.postTasksToApi(dummyTasks, '-').catch((error) => {
      expect(error).toBe(invalidResponse);
    });

    const req = httpMock.expectOne(environment.api.tasksEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(invalidResponse);
  });

  it('#signIn should return tokens on successful response', () => {
    const dummySuccessResponse: ApiResponse<LoginResponse> = {
      status: ApiResponseStatus.Success,
      data: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      },
    };

    service.signIn('test', 'password', '-').then((response) => {
      expect(response?.accessToken).toBe('accessToken');
      expect(response?.refreshToken).toEqual('refreshToken');
    });

    const req = httpMock.expectOne(environment.api.loginEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(dummySuccessResponse);
  });

  it('#signIn should reject promise on error response', () => {
    const errorResponse = {
      status: ApiResponseStatus.Error,
      data: null,
    };

    service.signIn('test', 'password', '-').catch((error) => {
      expect(error).toEqual(errorResponse);
    });

    const req = httpMock.expectOne(environment.api.loginEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse);
  });

  it('#signIn should reject promise on invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.signIn('test', 'password', '-').catch((error) => {
      expect(error).toBe(invalidResponse);
    });

    const req = httpMock.expectOne(environment.api.loginEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(invalidResponse);
  });

  it('#refreshAccessToken should return tokens on successful response', () => {
    const dummySuccessResponse: ApiResponse<RefreshResponse> = {
      status: ApiResponseStatus.Success,
      data: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      },
    };

    service.refreshAccessToken('current-token', '-').then((response) => {
      expect(response?.accessToken).toBe('accessToken');
      expect(response?.refreshToken).toEqual('refreshToken');
    });

    const req = httpMock.expectOne(environment.api.refreshEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(dummySuccessResponse);
  });

  it('#refreshAccessToken should reject promise on error response', () => {
    const errorResponse = {
      status: ApiResponseStatus.Error,
      data: null,
    };

    service.refreshAccessToken('current-token', '-').catch((error) => {
      expect(error).toEqual(errorResponse);
    });

    const req = httpMock.expectOne(environment.api.refreshEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse);
  });

  it('#refreshAccessToken should reject promise on invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.refreshAccessToken('current-token', '-').catch((error) => {
      expect(error).toBe(invalidResponse);
    });

    const req = httpMock.expectOne(environment.api.refreshEndpoint);
    expect(req.request.method).toBe('POST');
    req.flush(invalidResponse);
  });
});
