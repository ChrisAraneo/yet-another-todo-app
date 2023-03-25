import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Response } from './models/response.type';
import { Status } from './models/status.enum';
import { Task } from './models/tasks.type';
import { User } from './models/user.type';
import { TasksService } from './tasks/tasks.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private tasksService: TasksService,
  ) {}

  @Post('signup')
  @Header('content-type', 'application/json')
  async signup(@Body() body: any): Promise<Response<User | null>> {
    return await this.usersService
      .createUser(body as User)
      .then((result) => ({
        status: Status.Success,
        data: result,
      }))
      .catch((error: Error) => {
        return {
          status: Status.Error,
          data: null,
          message: error.stack,
        };
      });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Header('content-type', 'application/json')
  async login(@Request() request: any): Promise<Response<string>> {
    const user = request.user;

    return {
      status: Status.Success,
      data: await this.authService.login(user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('tasks')
  @Header('content-type', 'application/json')
  async getTasks(@Request() request: any): Promise<Response<any>> {
    const username = request && request.user && request.user.username;

    return await this.tasksService
      .getTasksOfUser(username)
      .then((result) => ({
        status: Status.Success,
        data: result,
      }))
      .catch((error: Error) => {
        return {
          status: Status.Error,
          data: null,
          message: error.stack,
        };
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('task')
  @Header('content-type', 'application/json')
  async createOrUpdateTask(@Request() request: any): Promise<Response<Task>> {
    const username = request && request.user && request.user.username;
    const task = request && request.body;

    return await this.tasksService
      .createOrUpdateTask(username, task)
      .then((result) => ({
        status: Status.Success,
        data: result,
      }))
      .catch((error: Error) => {
        return {
          status: Status.Error,
          data: null,
          message: error.stack,
        };
      });
  }
}
