import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('tasks')
  @Header('content-type', 'application/json')
  @Header('Access-Control-Allow-Origin', '*') // TODO Temporary... unsafe and only for testing purposes
  getTasks(): string {
    return this.appService.getTasks();
  }
}
