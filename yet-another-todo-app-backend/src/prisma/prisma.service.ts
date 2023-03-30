import { Injectable } from '@nestjs/common';
import {
  PrismaClient,
  Task as TaskSchema,
  TaskState as TaskStateSchema,
} from '@prisma/client';
import { TaskState } from '../models/task-state.type';
import { Task } from '../models/tasks.type';
import { User } from '../models/user.type';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async getUser(username: string): Promise<User> {
    return await this.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async createUser(user: User): Promise<User> {
    return this.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
      },
    });
  }

  async getTaskStates(): Promise<TaskStateSchema[]> {
    return await this.taskState.findMany();
  }

  async getTaskState(id: string): Promise<TaskStateSchema> {
    return await this.taskState.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createTaskState(taskState: TaskState): Promise<TaskStateSchema> {
    return this.taskState.create({
      data: {
        value: taskState.value,
        iconName: taskState.iconName,
        color: taskState.color,
        tooltipText: taskState.tooltipText,
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
    return await this.task.create({
      data: {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        state: {
          connect: {
            id: task.state.id,
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
    return await this.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        state: {
          connect: {
            id: task.state.id,
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
}
