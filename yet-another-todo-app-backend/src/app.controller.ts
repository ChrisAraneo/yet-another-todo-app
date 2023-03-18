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
    const jwtPayload = request.user;

    return {
      status: Status.Success,
      data: await this.authService.login(jwtPayload),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('tasks')
  @Header('content-type', 'application/json')
  async getTasks(@Request() request: any): Promise<Response<any>> {
    const jwtPayload = request.user;

    return await this.tasksService
      .getTasksOfUser(jwtPayload.username)
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
  @Post('tasks')
  @Header('content-type', 'application/json')
  setTasks(): Response<null> {
    // TODO Implement
    throw new Error('Not implemented');
  }
}
