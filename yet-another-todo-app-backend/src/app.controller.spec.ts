import { Test, TestingModule } from '@nestjs/testing';
import { DummyData } from '../test/dummy-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Status } from './models/status.enum';
import { Task } from './models/tasks.type';
import { User } from './models/user.type';
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
            login: jest.fn(async (user: User) => {
              return `dummy.jwt.token${user.id}`;
            }),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            getTasksOfUser: jest.fn(async (_) => {
              return DummyData.tasks;
            }),
            getTaskStates: jest.fn(async (_) => {
              return DummyData.taskStates;
            }),
            createUser: jest.fn(async (user: User): Promise<User> => {
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
        data: newUser,
      });
    });

    it('should return error response when username is already taken', async () => {
      const result = await appController.signup(DummyData.user);

      expect(result.status).toEqual(Status.Error);
      expect(result.message).toMatch(/Error: Username already exists/);
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
