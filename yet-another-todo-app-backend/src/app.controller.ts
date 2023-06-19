import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './auth/jwt-refresh.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Response } from './models/response.type';
import { Status } from './models/status.enum';
import { Task } from './models/tasks.type';
import { Tokens } from './models/tokens.type';
import { UserDetails } from './models/user-details.type';
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
  async signup(@Body() body: any): Promise<Response<UserDetails | null>> {
    // TODO Fix refresh token in response, right now its hashed
    return await this.usersService
      .createUser({ name: body.name, username: body.username }, body.password)
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
  async login(@Request() request: any): Promise<Response<Tokens>> {
    const user = request.user;

    return {
      status: Status.Success,
      data: await this.authService.login(user),
    };
  }

  // TODO Unit tests, e2e tests, testing
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @Header('content-type', 'application/json')
  async refreshAccessToken(@Request() request: any): Promise<Response<Tokens>> {
    const user = request.user;

    return {
      status: Status.Success,
      data: await this.authService.refreshTokens(user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('tasks')
  @Header('content-type', 'application/json')
  async getTasks(@Request() request: any): Promise<Response<Task[]>> {
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

  // TODO Unit tests, e2e tests, testing
  @UseGuards(JwtAuthGuard)
  @Post('tasks')
  @Header('content-type', 'application/json')
  async setTasks(@Request() request: any): Promise<Response<Task[]>> {
    const username = request && request.user && request.user.username;
    const tasks = request && request.body;

    return await this.tasksService
      .createOrUpdateTasks(username, tasks)
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

  @UseGuards(JwtAuthGuard)
  @Delete('task')
  @Header('content-type', 'application/json')
  async removeTask(@Request() request: any): Promise<Response<Task>> {
    const username = request && request.user && request.user.username;
    const task = request && request.body;

    return await this.tasksService
      .removeTask(username, task)
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
  @Delete('user')
  @Header('content-type', 'application/json')
  async deleteUser(@Request() request: any): Promise<Response<UserDetails>> {
    const user = request.user;

    return {
      status: Status.Success,
      data: await this.usersService.deleteUser(user.username),
    };
  }
}
