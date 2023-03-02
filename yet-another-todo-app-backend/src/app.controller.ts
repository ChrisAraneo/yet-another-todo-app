import { Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from './models/response.type';
import { Status } from './models/status.enum';
import { Tasks } from './models/tasks.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('tasks')
  @Header('content-type', 'application/json')
  @Header('Access-Control-Allow-Origin', '*') // TODO Temporary... unsafe and only for testing purposes
  getTasks(): string {
    const response: Tasks = {
      status: Status.Success,
      data: this.appService.getTasks(),
    };

    return JSON.stringify(response);
  }

  @Post('tasks')
  @Header('content-type', 'application/json')
  @Header('Access-Control-Allow-Origin', '*') // TODO Temporary... unsafe and only for testing purposes
  setTasks(): string {
    const response: Response<null> = {
      status: Status.Success,
      data: null,
    };

    return JSON.stringify(response);
  }
}
