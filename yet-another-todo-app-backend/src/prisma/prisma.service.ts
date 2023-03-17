import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
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
    return await this.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
      },
    });
  }
}
