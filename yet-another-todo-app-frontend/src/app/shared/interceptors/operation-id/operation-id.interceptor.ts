import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { OperationIdHeaderName } from './operation-id.types';

@Injectable()
export class OperationIdInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      request.clone({
        headers: request.headers.append(OperationIdHeaderName, uuidv4()),
      }),
    );
  }
}
