import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: User): Promise<User | null> {
    return this.prismaService
      .createUser(user)
      .then((result) => result)
      .catch((error) => {
        const target = error.meta.target[0];

        if (target === 'username') {
          throw new Error('Username already exists');
        }

        throw new Error(JSON.stringify(error));
      });
  }

  async findUser(username: string): Promise<User | undefined> {
    return await this.prismaService.getUser(username);
  }
}
