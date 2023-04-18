import { Test, TestingModule } from '@nestjs/testing';
import { TaskState as TaskStateSchema } from '@prisma/client';
import { Task } from 'src/models/tasks.type';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Status } from './models/status.enum';
import { User } from './models/user.type';
import { PrismaService } from './prisma/prisma.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;
  const dummyExistingUser = {
    id: '961d2c4d-8042-43a6-9a25-78d733094837',
    name: 'Lorem',
    username: 'lorem_ipsum',
    password: 'Qwerty123/',
  };
  const dummyTaskStates: TaskStateSchema[] = [
    {
      id: '17fc6138-53c6-41d9-b3dd-83ef2ed032ab',
      value: 'IN_PROGRESS',
      iconName: 'autorenew',
      color: 'orange',
    },
  ];
  const dummyTasks: Task[] = [
    {
      creationDate: '2023-03-01T19:43:44.738Z',
      description:
        'Nam consectetur tempus hendrerit. Nullam pharetra, risus eget feugiat maximus, tellus magna dignissim eros, at pulvinar nisi purus vitae lectus.',
      id: '8e7f40b7-71a2-44fa-b112-8539c1cc068c',
      startDate: '2023-03-01T19:43:44.738Z',
      state: dummyTaskStates[0],
      title: 'Lorem ipsum dolor sit',
      isHidden: false,
    },
    {
      creationDate: '2023-03-02T15:45:44.738Z',
      description:
        'Proin nulla ligula, cursus vel sapien in, euismod placerat elit. Vestibulum volutpat lectus id tempor pellentesque. Vestibulum suscipit vulputate augue sit amet porttitor. Sed eget cursus tortor. Ut a enim et dolor aliquet interdum sit amet porttitor sem.',
      id: '8e7f40b7-71a2-44fa-b112-8539c1cc068c',
      startDate: '2023-03-02T16:45:44.738Z',
      state: dummyTaskStates[0],
      title: 'Curabitur ornare fringilla',
      isHidden: false,
    },
  ];

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
                return {
                  ...dummyExistingUser,
                  username: username,
                  password: password,
                };
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
              return dummyTasks;
            }),
            getTaskStates: jest.fn(async (_) => {
              return dummyTaskStates;
            }),
            createUser: jest.fn(async (user: User): Promise<User> => {
              return new Promise<any>((resolve, reject) => {
                if (user.username === dummyExistingUser.username) {
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
              return dummyTasks;
            }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('signup', () => {
    it('should return success response when user was successfuly registered', async () => {
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
  });

  describe('signup', () => {
    it('should return error response when username is already taken', async () => {
      const result = await appController.signup(dummyExistingUser);

      expect(result.status).toEqual(Status.Error);
      expect(result.message).toMatch(/Error: Username already exists/);
    });
  });

  describe('getTasks', () => {
    it('should return success response with tasks', async () => {
      expect(
        await appController.getTasks({ user: { ...dummyExistingUser } }),
      ).toEqual({ status: Status.Success, data: dummyTasks });
    });
  });
});
