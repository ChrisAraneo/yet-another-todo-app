import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActionCreator, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { HttpLogItem } from '../../models/http-log-item.type';
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

@Injectable({
  providedIn: 'root',
})
export class HttpLoggingService {
  private readonly requestMap = {
    [this.api.signUpEndpoint]: {
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

  constructor(@Inject('API') public api: any, private store: Store<{ httpLog: any }>) {}

  logRequestIfValid(request: HttpRequest<unknown>): void {
    const method: string = request.method.toUpperCase();
    const endpoint: string | undefined = Object.keys(this.requestMap).find((endpoint: string) =>
      this.isRequestMatching(request, endpoint, method),
    );

    if (!!endpoint) {
      const actionCreator = (this.requestMap as any)[endpoint][method];
      this.dispatchLogRequestAction(actionCreator, request);
    }
  }

  logResponseIfValidRequestAndResponse(
    request: HttpRequest<unknown>,
    response: HttpEvent<any>,
  ): void {
    if (!this.isCorrectResponseType(response)) {
      return;
    }

    const method: string = request.method.toUpperCase();
    const endpoint: string | undefined = Object.keys(this.requestMap).find((endpoint: string) =>
      this.isRequestMatching(request, endpoint, method),
    );

    if (!!endpoint) {
      const actionCreator = (this.requestMap as any)[endpoint][method];
      const id = this.getId(request);

      this.dispatchLogResponseAction(actionCreator, id, response);
    }
  }

  private isRequestMatching(request: HttpRequest<unknown>, url: string, method: string): boolean {
    return !!request && request.url === url && request.method === method;
  }

  private isCorrectResponseType(response: any): boolean {
    console.warn(response);

    return !!response && response.type !== 0;
  }

  private getId(request: HttpRequest<unknown>): string {
    return request.headers.get(OPERATION_ID_HEADER_NAME) || '';
  }

  private dispatchLogRequestAction(
    actionCreator: ActionCreator<any, (props: HttpLogItem) => HttpLogItem & TypedAction<any>>,
    request: HttpRequest<unknown>,
  ): void {
    const id = request.headers.get(OPERATION_ID_HEADER_NAME) || '';
    const data = request.body;

    this.store.dispatch(
      actionCreator({
        id: id,
        logType: HttpLogType.Request,
        data: data,
        creationDate: new Date(),
      } as any),
    );
  }

  private dispatchLogResponseAction(
    actionCreator: ActionCreator<any, (props: HttpLogItem) => HttpLogItem & TypedAction<any>>,
    operationId: string,
    response: HttpEvent<unknown>,
  ): void {
    this.store.dispatch(
      actionCreator({
        id: operationId,
        logType: HttpLogType.Response,
        data: response,
        creationDate: new Date(),
      } as any),
    );
  }
}
