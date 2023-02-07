import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { environment } from 'src/environments/environment';
import { Task } from '../../models/task.model';
import { ApiClientService } from './api-client.service';
import { ApiResponse, ApiResponseData, ApiResponseStatus } from './api-client.types';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;
  let dummyResponseData: ApiResponseData[];
  let dummyTasks: Task[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiClientService],
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
          tooltipText: 'Task in progress',
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
          tooltipText: 'Task is suspended',
        },
        creationDate: '2023-02-06T19:38:33.345Z',
        id: '2b3f690b-7a65-4e03-b042-467dd758ac6f',
        startDate: '2023-01-01T00:00:00.000Z',
      },
    ];
    dummyTasks = dummyResponseData.map((item) => TaskCreator.create(item));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchTasksFromApi should return an Observable<Task[]> on successful response', () => {
    const dummySuccessResponse: ApiResponse = {
      status: ApiResponseStatus.Success,
      data: dummyResponseData,
    };

    service.fetchTasksFromApi().subscribe((tasks) => {
      expect(tasks?.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySuccessResponse);
  });

  it('#fetchTasksFromApi should return an Observable<undefined> on error response', () => {
    const dummyErrorResponse: ApiResponse = {
      status: ApiResponseStatus.Error,
      data: null,
      message: 'Error message',
    };

    service.fetchTasksFromApi().subscribe((tasks) => {
      expect(tasks).toEqual(undefined);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyErrorResponse);
  });

  it('#fetchTasksFromApi should return an Observable<undefined> on invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.fetchTasksFromApi().subscribe((tasks) => {
      expect(tasks).toEqual(undefined);
    });

    const req = httpMock.expectOne(`${environment.api.origin}/`);
    expect(req.request.method).toBe('GET');
    req.flush(invalidResponse);
  });

  it('#postTasksToApi should handle success response', () => {
    service.postTasksToApi(dummyTasks);

    const req = httpMock.expectOne(`${environment.api.origin}/`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: ApiResponseStatus.Success,
      data: null,
    });
  });

  it('#postTasksToApi should handle error response', () => {
    service.postTasksToApi(dummyTasks);

    const req = httpMock.expectOne(`${environment.api.origin}/`);
    expect(req.request.method).toBe('POST');
    req.flush({
      status: ApiResponseStatus.Error,
      data: null,
    });
  });

  it('#postTasksToApi should handle invalid response', () => {
    const invalidResponse: any = `<h1>Invalid response</h1>`;

    service.postTasksToApi(dummyTasks);

    const req = httpMock.expectOne(`${environment.api.origin}/`);
    expect(req.request.method).toBe('POST');
    req.flush(invalidResponse);
  });
});
