import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  PrismaClient,
  Task as TaskSchema,
  TaskState as TaskStateSchema,
  User as UserSchema,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { TaskState } from '../models/task-state.type';
import { Task } from '../models/tasks.type';
import { UserInfo } from '../models/user-info.type';

@Injectable()
export class PrismaService extends PrismaClient {
  private refreshTokenOptions: JwtSignOptions;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    this.refreshTokenOptions = {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    };
  }

  async getUser(username: string): Promise<UserSchema> {
    return await this.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async createUser(user: UserInfo, password: string): Promise<UserSchema> {
    const createdUser = await this.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: await bcrypt.hash(password, 10),
        refreshToken: '', // TODO Optional? And pass null here
      },
    });

    const refreshToken = this.jwtService.sign(
      {
        id: createdUser.id,
        username: createdUser.username,
        name: createdUser.name,
      },
      this.refreshTokenOptions,
    );

    return this.updateUserRefreshToken(
      createdUser.username,
      await bcrypt.hash(refreshToken, 10),
    );
  }

  async deleteUser(username: string): Promise<UserSchema> {
    return this.user.delete({
      where: {
        username: username,
      },
    });
  }

  async updateUserRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<UserSchema> {
    return this.user.update({
      where: { username },
      data: {
        ...(await this.getUser(username)),
        refreshToken: await bcrypt.hash(refreshToken, 10),
      },
    });
  }

  async getTaskStates(): Promise<TaskStateSchema[]> {
    return await this.taskState.findMany();
  }

  async getTaskState(value: string): Promise<TaskStateSchema> {
    return await this.taskState.findUnique({
      where: {
        value: value,
      },
    });
  }

  async createTaskState(taskState: TaskState): Promise<TaskStateSchema> {
    return this.taskState.create({
      data: {
        value: taskState.value,
        iconName: taskState.iconName,
        color: taskState.color,
      },
    });
  }

  async getTasksOfUser(username: string): Promise<TaskSchema[]> {
    return await this.task.findMany({
      where: {
        user: {
          username: username,
        },
      },
    });
  }

  async getTaskOfUser(username: string, taskId: string): Promise<TaskSchema> {
    return await this.task.findFirst({
      where: {
        id: taskId,
        user: {
          username: username,
        },
      },
    });
  }

  async createTask(username: string, task: Task): Promise<TaskSchema> {
    await this.createTaskStateIfDoesntExist(task.state);

    return await this.task.create({
      data: {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        state: {
          connect: {
            value: task.state.value,
          },
        },
        isHidden: task.isHidden,
        user: {
          connect: {
            username: username,
          },
        },
      },
    });
  }

  async updateTask(username: string, task: Task): Promise<TaskSchema> {
    await this.createTaskStateIfDoesntExist(task.state);

    return await this.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        state: {
          connect: {
            value: task.state.value,
          },
        },
        isHidden: task.isHidden,
        user: {
          connect: {
            username: username,
          },
        },
      },
    });
  }

  async removeTask(username: string, taskId: string): Promise<void> {
    if (await this.getTaskOfUser(username, taskId)) {
      await this.task.delete({
        where: {
          id: taskId,
        },
      });
    } else {
      throw new Error(
        `Task with Id ${taskId} does not belong to the user ${username}`,
      );
    }
  }

  private async createTaskStateIfDoesntExist(state: TaskState): Promise<void> {
    const states = await this.getTaskStates();

    if (!states.find((item) => item.value === state.value)) {
      await this.createTaskState(state);
    }

    return;
  }
}
