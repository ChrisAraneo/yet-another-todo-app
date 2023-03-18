import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { User } from './models/user.type';
import { PrismaService } from './prisma/prisma.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;
  let response: object;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
      controllers: [AppController],
      providers: [
        AppService,
        UsersService,
        TasksService,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(
              async (username: string, password: string) => {
                return {
                  id: 'e42ad191-40b5-44b7-b630-17846032e70c',
                  name: 'Lorem user',
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
          useValue: {},
        },
      ],
    }).compile();

    response = JSON.parse(
      '{"data": [{"creationDate": "2023-03-01T19:43:44.738Z", "description": "Nam consectetur tempus hendrerit. Nullam pharetra, risus eget feugiat maximus, tellus magna dignissim eros, at pulvinar nisi purus vitae lectus.", "id": "8e7f40b7-71a2-44fa-b112-8539c1cc068c", "startDate": "2023-03-01T19:43:44.738Z", "state": {"id": "17fc6138-53c6-41d9-b3dd-83ef2ed032ab","color": "orange", "iconName": "autorenew", "tooltipText": "Task in progress", "value": "IN_PROGRESS"}, "title": "Lorem ipsum dolor sit"}, {"creationDate": "2023-03-02T15:45:44.738Z", "description": "Proin nulla ligula, cursus vel sapien in, euismod placerat elit. Vestibulum volutpat lectus id tempor pellentesque. Vestibulum suscipit vulputate augue sit amet porttitor. Sed eget cursus tortor. Ut a enim et dolor aliquet interdum sit amet porttitor sem.", "id": "8e7f40b7-71a2-44fa-b112-8539c1cc068c", "startDate": "2023-03-02T16:45:44.738Z", "state": {"id": "17fc6138-53c6-41d9-b3dd-83ef2ed032ab","color": "orange", "iconName": "autorenew", "tooltipText": "Task in progress", "value": "IN_PROGRESS"}, "title": "Curabitur ornare fringilla"}], "status": "success"}',
    );

    appController = app.get<AppController>(AppController);
  });

  describe('tasks', () => {
    it('should return example tasks', () => {
      expect(
        appController.getTasks('e42ad191-40b5-44b7-b630-17846032e70c'),
      ).toStrictEqual(response);
    });
  });
});
