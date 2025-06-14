import { HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActionCreator, Store } from '@ngrx/store';

import { Environment } from '../../../../environments/environment.interface';
import { HttpLogItem } from '../../../../../../../libs/yet-another-todo-app-models/src/models/http-log-item.interface';
import { HttpLogType } from '../../../../../../../libs/yet-another-todo-app-models/src/models/http-log-type.enum';
import { OPERATION_ID_HEADER_NAME } from '../../../../../../../libs/yet-another-todo-app-models/src/models/operation-id-header-name.const';
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

@Injectable({
  providedIn: 'root',
})
export class HttpLoggingService {
  private readonly requestMap;

  constructor(
    @Inject('API')
    public api: Environment,
    public store: Store<{
      httpLog: any;
    }>,
  ) {
    this.requestMap = {
      [this.api.signupEndpoint]: {
        POST: pushToPostSignupHttpLog,
      },
      [this.api.loginEndpoint]: {
        POST: pushToPostLoginHttpLog,
      },
      [this.api.refreshEndpoint]: {
        POST: pushToPostRefreshHttpLog,
      },
      [this.api.tasksEndpoint]: {
        GET: pushToGetTasksHttpLog,
        POST: pushToPostTasksHttpLog,
      },
      [this.api.taskEndpoint]: {
        POST: pushToPostTaskHttpLog,
        DELETE: pushToDeleteTaskHttpLog,
      },
      [this.api.userEndpoint]: {
        DELETE: pushToDeleteUserHttpLog,
      },
    } as const;
  }

  logRequestIfValid(
    request: HttpRequest<unknown>,
    creationDate: Date = new Date(),
  ): void {
    const method: string = request.method.toUpperCase();
    const endpoint: string | undefined = Object.keys(this.requestMap).find(
      (endpoint: string) => this.isRequestMatching(request, endpoint, method),
    );

    if (endpoint) {
      const actionCreator = (this.requestMap as any)[endpoint][method];

      if (typeof actionCreator !== 'function') {
        return;
      }

      this.dispatchLogRequestAction(actionCreator, request, creationDate);
    }
  }

  logResponseIfValidRequestAndResponse(
    request: HttpRequest<unknown>,
    response: HttpEvent<any>,
    creationDate: Date = new Date(),
  ): void {
    if (!this.isCorrectResponseType(response)) {
      return;
    }

    const method: string = request.method.toUpperCase();
    const endpoint: string | undefined = Object.keys(this.requestMap).find(
      (endpoint: string) => this.isRequestMatching(request, endpoint, method),
    );

    if (endpoint) {
      const actionCreator = (this.requestMap as any)[endpoint][method];
      const id = this.getId(request);

      if (typeof actionCreator !== 'function') {
        return;
      }

      this.dispatchLogResponseAction(actionCreator, id, response, creationDate);
    }
  }

  private isRequestMatching(
    request: HttpRequest<unknown>,
    url: string,
    method: string,
  ): boolean {
    return Boolean(request) && request.url === url && request.method === method;
  }

  private isCorrectResponseType(response: any): boolean {
    return Boolean(response) && response.type !== HttpEventType.Sent;
  }

  private getId(request: HttpRequest<unknown>): string {
    return request.headers.get(OPERATION_ID_HEADER_NAME) || '';
  }

  private dispatchLogRequestAction(
    actionCreator: any, // TODO Fix any
    request: HttpRequest<unknown>,
    creationDate: Date,
  ): void {
    const id = request.headers.get(OPERATION_ID_HEADER_NAME) || '';
    const data = request.body;

    this.store.dispatch(
      actionCreator({
        id,
        logType: HttpLogType.Request,
        data,
        creationDate,
      } as any),
    );
  }

  private dispatchLogResponseAction(
    actionCreator: any, // TODO Fix any
    operationId: string,
    response: HttpEvent<unknown>,
    creationDate: Date,
  ): void {
    this.store.dispatch(
      actionCreator({
        id: operationId,
        logType: HttpLogType.Response,
        data: response,
        creationDate,
      } as any),
    );
  }
}
