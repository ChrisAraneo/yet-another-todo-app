import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpLoggingService } from '../../services/http-logging/http-logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private httpLoggingService: HttpLoggingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpLoggingService.logRequestIfValid(request);

    return next.handle(request).pipe(
      tap((response) => {
        this.httpLoggingService.logResponseIfValidRequestAndResponse(request, response);
      }),
    );
  }
}
