import { Injectable } from '@nestjs/common';
import { UserDetails } from '../models/user-details.type';
import { UserInfo } from '../models/user-info.type';
import { PrismaService } from '../prisma/prisma.service';

export const USERNAME_ALREADY_EXISTS = new Error('Username already exists'); // TODO Move elsewhere

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(
    user: UserInfo,
    password: string,
  ): Promise<UserDetails | null> {
    return await this.prismaService
      .createUser(user, password)
      .then(({ id, name, username, refreshToken }) => ({
        id,
        name,
        username,
        refreshToken,
      }))
      .catch((error) => {
        const target = error?.meta?.target[0];

        if (target === 'username') {
          throw USERNAME_ALREADY_EXISTS;
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

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<UserDetails | null> {
    // TODO Throw custom error

    return this.prismaService
      .updateUserRefreshToken(username, refreshToken)
      .then(({ id, name, username }) => ({ id, name, username, refreshToken }))
      .catch((error) => {
        throw error;
      });
  }
}
