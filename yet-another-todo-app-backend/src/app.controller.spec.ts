import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User as UserSchema } from '@prisma/client';
import { DummyData } from '../test/dummy-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { Status } from './models/status.enum';
import { Task } from './models/tasks.type';
import { UserDetails } from './models/user-details.type';
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
        AppService,
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
            login: jest.fn(async (user: UserDetails) => {
              return `dummy.jwt.token${user.id}`;
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
    it('should return token when user provided correct credentials', async () => {
      expect(
        await appController.login({
          user: DummyData.user,
        }),
      ).toEqual({
        status: Status.Success,
        data: 'dummy.jwt.token961d2c4d-8042-43a6-9a25-78d733094837',
      });
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
});
