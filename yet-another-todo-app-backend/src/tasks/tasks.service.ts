import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async getTasksOfUser(username: string): Promise<Task[] | undefined> {
    return await this.prismaService.getTasksOfUser(username);
  }
}
