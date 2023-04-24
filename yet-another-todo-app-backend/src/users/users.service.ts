import { Injectable } from '@nestjs/common';
import { UserDetails } from '../models/user-details.type';
import { UserInfo } from '../models/user-info.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(
    user: UserInfo,
    password: string,
  ): Promise<UserDetails | null> {
    return this.prismaService
      .createUser(user, password)
      .then(({ id, name, username }) => ({ id, name, username }))
      .catch((error) => {
        const target = error?.meta?.target[0];

        if (target === 'username') {
          throw new Error('Username already exists');
        }

        throw new Error(JSON.stringify(error));
      });
  }

  async findUser(
    username: string,
  ): Promise<(UserDetails & { passwordHash: string }) | undefined> {
    const user = await this.prismaService.getUser(username);

    if (!user) {
      return undefined;
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      passwordHash: user.password,
    };
  }

  async deleteUser(username: string): Promise<UserDetails | null> {
    return this.prismaService
      .deleteUser(username)
      .then(({ id, name, username }) => ({ id, name, username }))
      .catch((error) => {
        throw error;
      });
  }
}
