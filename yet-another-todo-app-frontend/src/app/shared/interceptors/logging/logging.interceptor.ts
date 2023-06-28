import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActionCreator, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, tap } from 'rxjs';
import { HttpLogItem } from '../../models/http-log-item.type';
import { HttpLogType } from '../../models/http-log-type.enum';
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
import { OperationIdHeaderName } from '../operation-id/operation-id.types';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(@Inject('API') public api: any, private store: Store<{ httpLog: any }>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO Refactor
    if (this.isRequestMatching(request, this.api.signUpEndpoint, 'POST')) {
      this.dispatchLogRequestAction(pushToPostSignupHttpLog, request);
    } else if (this.isRequestMatching(request, this.api.loginEndpoint, 'POST')) {
      this.dispatchLogRequestAction(pushToPostLoginHttpLog, request);
    } else if (this.isRequestMatching(request, this.api.refreshEndpoint, 'POST')) {
      this.dispatchLogRequestAction(pushToPostRefreshHttpLog, request);
    } else if (this.isRequestMatching(request, this.api.tasksEndpoint, 'GET')) {
      this.dispatchLogRequestAction(pushToGetTasksHttpLog, request);
    } else if (this.isRequestMatching(request, this.api.tasksEndpoint, 'POST')) {
      this.dispatchLogRequestAction(pushToPostTasksHttpLog, request);
    } else if (this.isRequestMatching(request, this.api.taskEndpoint, 'POST')) {
      this.dispatchLogRequestAction(pushToPostTaskHttpLog, request);
    } else if (this.isRequestMatching(request, this.api.taskEndpoint, 'DELETE')) {
      this.dispatchLogRequestAction(pushToDeleteTaskHttpLog, request);
    } else if (this.isRequestMatching(request, this.api.userEndpoint, 'DELETE')) {
      this.dispatchLogRequestAction(pushToDeleteUserHttpLog, request);
    }

    const id = this.getId(request);

    return next.handle(request).pipe(
      tap((response) => {
        if (!this.isCorrectResponseType(response)) {
          return;
        }

        // TODO Refactor
        if (this.isResponseMatching(request, this.api.signUpEndpoint)) {
          this.dispatchLogResponseAction(pushToPostSignupHttpLog, id, response);
        } else if (this.isResponseMatching(request, this.api.loginEndpoint)) {
          this.dispatchLogResponseAction(pushToPostLoginHttpLog, id, response);
        } else if (this.isResponseMatching(request, this.api.refreshEndpoint)) {
          this.dispatchLogResponseAction(pushToPostRefreshHttpLog, id, response);
        } else if (this.isResponseMatching(request, this.api.tasksEndpoint)) {
          this.dispatchLogResponseAction(pushToGetTasksHttpLog, id, response);
        } else if (this.isResponseMatching(request, this.api.tasksEndpoint)) {
          this.dispatchLogResponseAction(pushToPostTasksHttpLog, id, response);
        } else if (this.isResponseMatching(request, this.api.taskEndpoint)) {
          this.dispatchLogResponseAction(pushToPostTaskHttpLog, id, response);
        } else if (this.isResponseMatching(request, this.api.taskEndpoint)) {
          this.dispatchLogResponseAction(pushToDeleteTaskHttpLog, id, response);
        } else if (this.isResponseMatching(request, this.api.userEndpoint)) {
          this.dispatchLogResponseAction(pushToDeleteUserHttpLog, id, response);
        }
      }),
    );
  }

  private isRequestMatching(request: HttpRequest<unknown>, url: string, method: string): boolean {
    return !!request && request.url === url && request.method === method;
  }

  private isResponseMatching(request: HttpRequest<unknown>, url: string): boolean {
    return !!request && request.url === url;
  }

  private isCorrectResponseType(response: any): boolean {
    return !!response && response.type !== 0;
  }

  private getId(request: HttpRequest<unknown>): string {
    return request.headers.get(OperationIdHeaderName) || '';
  }

  private dispatchLogRequestAction(
    actionCreator: ActionCreator<any, (props: HttpLogItem) => HttpLogItem & TypedAction<any>>,
    request: HttpRequest<unknown>,
  ): void {
    const id = request.headers.get(OperationIdHeaderName) || '';
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
