import { Injectable } from '@nestjs/common';
import {
  Task as TaskSchema,
  TaskState as TaskStateSchema,
} from '@prisma/client';
import { Task } from '../models/tasks.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async getTasksOfUser(username: string): Promise<Task[] | undefined> {
    const taskStates: TaskStateSchema[] =
      await this.prismaService.getTaskStates();

    const tasks: TaskSchema[] = await this.prismaService.getTasksOfUser(
      username,
    );

    return (tasks || []).map((item: TaskSchema) => {
      const taskState = taskStates.find((state) => state.id === item.stateId);

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        state: {
          id: taskState.id,
          value: taskState.value,
          iconName: taskState.iconName,
          color: taskState.color,
        },
        isHidden: item.isHidden,
        creationDate: !this.isNullOrUndefined(item.creationDate)
          ? item.creationDate.toISOString()
          : undefined, // TODO creationDate should be Date type ??
        startDate: !this.isNullOrUndefined(item.startDate)
          ? item.startDate.toISOString()
          : undefined,
        endDate: !this.isNullOrUndefined(item.endDate)
          ? item.endDate.toISOString()
          : undefined,
      };
    });
  }

  async createOrUpdateTask(username: string, task: Task): Promise<Task> {
    const existingTask: TaskSchema = await this.prismaService.getTaskOfUser(
      username,
      task.id,
    );

    const result = !existingTask
      ? await this.prismaService.createTask(username, task)
      : await this.prismaService.updateTask(username, task);

    const taskState = await this.prismaService.getTaskState(result.stateId);

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      state: {
        id: taskState.id,
        value: taskState.value,
        iconName: taskState.iconName,
        color: taskState.color,
      },
      isHidden: task.isHidden,
      creationDate: !this.isNullOrUndefined(result.creationDate)
        ? result.creationDate.toISOString()
        : undefined, // TODO creationDate should be Date type??
      startDate: !this.isNullOrUndefined(result.startDate)
        ? result.startDate.toISOString()
        : undefined,
      endDate: !this.isNullOrUndefined(result.endDate)
        ? result.endDate.toISOString()
        : undefined,
    };
  }

  // TODO Unit tests, e2e tests, testing
  async createOrUpdateTasks(username: string, tasks: Task[]): Promise<Task[]> {
    const result: Task[] = [];

    for (const task of tasks) {
      result.push(await this.createOrUpdateTask(username, task));
    }

    return result;
  }

  async removeTask(username: string, task: Task): Promise<Task> {
    return this.prismaService.removeTask(username, task.id).then(() => {
      return task;
    });
  }

  private isNullOrUndefined(item: any): boolean {
    return item === undefined || item === null;
  }
}
