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
          tooltipText: taskState.tooltipText,
        },
        creationDate: item.creationDate.toISOString(),
        startDate: item.startDate.toISOString(),
        endDate: item.endDate.toISOString(),
      };
    });
  }
}
