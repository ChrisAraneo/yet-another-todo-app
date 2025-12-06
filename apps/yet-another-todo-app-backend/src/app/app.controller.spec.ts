import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User as UserSchema } from '@prisma/client';
import { DummyData } from '../test/dummy-data';
import { AppController } from './app.controller';
import { AuthService } from './auth/services/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { Status } from './models/status.enum';
import { Task } from './models/tasks.type';
import { UserInfo } from './models/user-info.type';
import { PrismaService } from './prisma/prisma.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
      controllers: [AppController],
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(async (payload: any) => {
              return `notrealtoken${JSON.stringify(payload)}`;
            }),
          },
        },
        {
          provide: JwtStrategy,
          useValue: {
            validate: jest.fn(async (payload: any) => {
              return {
                id: payload.id,
                name: payload.name,
                username: payload.username,
              };
            }),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(
              async (username: string, password: string) => {
                return new Promise<any>((resolve) => {
                  if (
                    username === DummyData.user.username &&
                    password === DummyData.user.password
                  ) {
                    resolve({ ...DummyData.user });
                  } else {
                    resolve(null);
                  }
                });
              },
            ),
            login: jest.fn(async () => {
              return {
                accessToken: `dummy.jwt.token`,
                refreshToken: `dummy.jwt.token`,
              };
            }),
            refreshTokens: jest.fn(async (refreshToken: string) => {
              if (refreshToken === DummyData.user.refreshToken) {
                return {
                  accessToken: `dummy.jwt.token`,
                  refreshToken: `dummy.jwt.token`,
                };
              } else {
                throw Error('Invalid refresh token.');
              }
            }),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            getTasksOfUser: jest.fn(async () => {
              return DummyData.tasks;
            }),
            getTaskStates: jest.fn(async () => {
              return DummyData.taskStates;
            }),
            createUser: jest.fn(async (user: UserInfo): Promise<UserSchema> => {
              return new Promise<any>((resolve, reject) => {
                if (user.username === DummyData.user.username) {
                  reject({
                    meta: {
                      target: ['username'],
                    },
                  });
                } else {
                  resolve(user);
                }
              });
            }),
            deleteUser: jest.fn(async (): Promise<UserSchema> => {
              return new Promise<any>((resolve) => {
                resolve({
                  id: DummyData.user.id,
                  name: DummyData.user.name,
                  username: DummyData.user.username,
                });
              });
            }),
          },
        },
        {
          provide: TasksService,
          useValue: {
            getTasksOfUser: jest.fn(async () => {
              return DummyData.tasks;
            }),
            createOrUpdateTask: jest.fn(async (_: string, task: Task) => task),
            removeTask: jest.fn(async (_: string, task: Task) => task),
            createOrUpdateTasks: jest.fn(
              async (_: string, tasks: Task[]) => tasks,
            ),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('signup', () => {
    it('should return success response when new user was successfuly registered', async () => {
      const newUser = {
        name: 'New user',
        username: 'new_username',
        password: '123',
      };

      expect(await appController.signup(newUser)).toEqual({
        status: Status.Success,
        data: { id: undefined, name: newUser.name, username: newUser.username },
      });
    });

    it('should return error response when username is already taken', async () => {
      await expect(appController.signup(DummyData.user)).rejects.toThrowError(
        'Username already exist',
      );
    });
  });

  describe('login', () => {
    it('should return tokens when user provided correct credentials', async () => {
      expect(
        await appController.login({
          user: DummyData.user,
        }),
      ).toEqual({
        status: Status.Success,
        data: {
          accessToken: 'dummy.jwt.token',
          refreshToken: 'dummy.jwt.token',
        },
      });
    });
  });

  describe('refreshAccessToken', () => {
    it('should return tokens when user provided correct refresh token', async () => {
      expect(
        await appController.refreshAccessToken({
          refreshToken: DummyData.user.refreshToken,
        }),
      ).toEqual({
        status: Status.Success,
        data: {
          accessToken: 'dummy.jwt.token',
          refreshToken: 'dummy.jwt.token',
        },
      });
    });

    it('should return error response when provided incorrect refresh token', async () => {
      await expect(
        appController.refreshAccessToken({ refreshToken: 'incorrect-token' }),
      ).rejects.toThrowError();
    });
  });

  describe('getTasks', () => {
    it('should return success response with tasks', async () => {
      expect(await appController.getTasks({ user: DummyData.user })).toEqual({
        status: Status.Success,
        data: DummyData.tasks,
      });
    });
  });

  describe('setTasks', () => {
    it('should return success response when task was successfuly created', async () => {
      expect(
        await appController.setTasks({
          user: DummyData.user,
          body: DummyData.tasks,
        }),
      ).toEqual({ status: Status.Success, data: DummyData.tasks });
    });
  });

  describe('createOrUpdateTask', () => {
    it('should return success response when task was successfuly created', async () => {
      const task = DummyData.tasks[0];

      expect(
        await appController.createOrUpdateTask({
          user: DummyData.user,
          body: task,
        }),
      ).toEqual({ status: Status.Success, data: task });
    });
  });

  describe('removeTask', () => {
    it('should return success response when task was successfuly deleted', async () => {
      const task = DummyData.tasks[0];

      expect(
        await appController.removeTask({
          user: DummyData.user,
          body: task,
        }),
      ).toEqual({ status: Status.Success, data: task });
    });
  });

  describe('deleteUser', () => {
    it('should return success response when user was successfuly deleted', async () => {
      expect(
        await appController.deleteUser({
          user: DummyData.user,
        }),
      ).toEqual({
        status: Status.Success,
        data: {
          id: DummyData.user.id,
          name: DummyData.user.name,
          username: DummyData.user.username,
        },
      });
    });
  });
});
