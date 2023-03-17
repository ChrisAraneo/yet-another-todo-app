import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Response } from './models/response.type';
import { Status } from './models/status.enum';
import { Tasks } from './models/tasks.type';
import { User } from './models/user.type';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService,
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
    return {
      status: Status.Success,
      data: await this.authService.login(request.user as User),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('tasks')
  @Header('content-type', 'application/json')
  getTasks(): Tasks {
    return {
      status: Status.Success,
      data: this.appService.getTasks(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('tasks')
  @Header('content-type', 'application/json')
  setTasks(): Response<null> {
    return {
      status: Status.Success,
      data: null,
    };
  }
}
