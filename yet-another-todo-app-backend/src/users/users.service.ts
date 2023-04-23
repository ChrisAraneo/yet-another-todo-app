import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/models/user-info.type';
import { User } from '../models/user.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: UserInfo, password: string): Promise<User | null> {
    return this.prismaService
      .createUser(user, password)
      .then((result) => result)
      .catch((error) => {
        const target = error?.meta?.target[0];

        if (target === 'username') {
          throw new Error('Username already exists');
        }

        throw new Error(JSON.stringify(error));
      });
  }

  async findUser(username: string): Promise<User | undefined> {
    return await this.prismaService.getUser(username);
  }

  async deleteUser(username: string): Promise<User | null> {
    return this.prismaService
      .deleteUser(username)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  }
}
