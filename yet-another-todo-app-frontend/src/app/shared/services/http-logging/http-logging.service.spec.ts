import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockProvider } from 'ng-mocks';
import { environment } from 'src/environments/environment';
import { HttpLogType } from '../../models/http-log-type.enum';
import { OPERATION_ID_HEADER_NAME } from '../../models/operation-id-header-name.const';
import {
  pushToDeleteTaskHttpLog,
  pushToDeleteUserHttpLog,
  pushToGetTasksHttpLog,
  pushToPostLoginHttpLog,
  pushToPostRefreshHttpLog,
  pushToPostSignupHttpLog,
  pushToPostTaskHttpLog,
  pushToPostTasksHttpLog,
} from '../../store/actions/http-log.actions';
import { HttpLoggingService } from './http-logging.service';

describe('HttpLoggingService', () => {
  let service: HttpLoggingService;
  let store: Store;
  let creationDate: Date;
  let dummyHeaders: HttpHeaders;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: 'API', useValue: environment.api }, MockProvider(Store)],
    });
    service = TestBed.inject(HttpLoggingService);
    store = service.store;
    creationDate = new Date('2023-08-24');
    dummyHeaders = new HttpHeaders({ [OPERATION_ID_HEADER_NAME]: '-' });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#logRequestIfValid should dispatch action after POST /signup request', () => {
    const method = 'POST';
    const url = environment.api.signupEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToPostSignupHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should ignore OPTIONS /signup request', () => {
    const method = 'OPTIONS';
    const url = environment.api.signupEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('#logRequestIfValid should dispatch action after POST /login request', () => {
    const method = 'POST';
    const url = environment.api.loginEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToPostLoginHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should ignore OPTIONS /login request', () => {
    const method = 'OPTIONS';
    const url = environment.api.loginEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('#logRequestIfValid should dispatch action after POST /refresh request', () => {
    const method = 'POST';
    const url = environment.api.refreshEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToPostRefreshHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should ignore OPTIONS /refresh request', () => {
    const method = 'OPTIONS';
    const url = environment.api.refreshEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('#logRequestIfValid should dispatch action after GET /tasks request', () => {
    const method = 'GET';
    const url = environment.api.tasksEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToGetTasksHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should dispatch action after POST /tasks request', () => {
    const method = 'POST';
    const url = environment.api.tasksEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToPostTasksHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should ignore OPTIONS /tasks request', () => {
    const method = 'OPTIONS';
    const url = environment.api.tasksEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('#logRequestIfValid should dispatch action after POST /task request', () => {
    const method = 'POST';
    const url = environment.api.taskEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToPostTaskHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should dispatch action after DELETE /task request', () => {
    const method = 'DELETE';
    const url = environment.api.taskEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToDeleteTaskHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should ignore OPTIONS /task request', () => {
    const method = 'OPTIONS';
    const url = environment.api.taskEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('#logRequestIfValid should dispatch action after DELETE /user request', () => {
    const method = 'DELETE';
    const url = environment.api.userEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const action = pushToDeleteUserHttpLog({
      id: '-',
      logType: HttpLogType.Request,
      data: null,
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('#logRequestIfValid should ignore OPTIONS /user request', () => {
    const method = 'OPTIONS';
    const url = environment.api.userEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logRequestIfValid(request, creationDate);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('#logResponseIfValidRequestAndResponse should ignore Sent type HTTP event and not log it', () => {
    const method = 'DELETE';
    const url = environment.api.userEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const response = { type: 0 };

    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logResponseIfValidRequestAndResponse(request, response);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('#logResponseIfValidRequestAndResponse should log response when request and response are valid', () => {
    const method = 'DELETE';
    const url = environment.api.userEndpoint;
    const request = new HttpRequest(method, url, null, { headers: dummyHeaders });
    const response = { type: 1, test: 'OK' };

    const action = pushToDeleteUserHttpLog({
      id: '-',
      logType: HttpLogType.Response,
      data: { type: 1, test: 'OK' },
      creationDate: creationDate,
    } as any);
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    service.logResponseIfValidRequestAndResponse(request, response, creationDate);

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  // TODO Add more unit tests
});
