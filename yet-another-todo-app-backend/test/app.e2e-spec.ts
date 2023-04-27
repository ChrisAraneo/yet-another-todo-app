import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Status } from '../src/models/status.enum';
import { Task } from '../src/models/tasks.type';
import { AppModule } from './../src/app.module';

type SignupRequest = {
  username: string;
  password: string;
  name: string;
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let existingUser: SignupRequest;
  let newUser: SignupRequest;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    existingUser = {
      name: 'E2E Test User',
      username: 'end2endTestUser',
      password: 'pleasechangeme',
    };
    newUser = {
      name: 'E2E Test New Signup User',
      username: 'end2endNewTestUser',
      password: 'pleasechangeme',
    };

    await app.init();

    await request(app.getHttpServer()).post('/signup').send(existingUser);
  });

  afterEach(async () => {
    await request(app.getHttpServer()).delete('/user').send(existingUser); // TODO delete only if exists
    await request(app.getHttpServer()).delete('/user').send(newUser); // TODO delete only if exists
  });

  describe('POST /login', () => {
    it('should login and receive token when provided correct credentials', () => {
      return request(app.getHttpServer())
        .post('/login')
        .send(existingUser)
        .expect((res) => {
          expect(res.body.status).toBe(Status.Success);
        });
    });

    it('should return unauthorized error and reject login when provided incorrect credentials', () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({ ...existingUser, password: `${existingUser.password}#` })
        .expect(401);
    });
  });

  describe('POST /signup', () => {
    it('should sign up new user and receive success response', () => {
      return request(app.getHttpServer())
        .post('/signup')
        .send({
          name: 'E2E Test New Signup User',
          username: 'end2endNewTestUser',
          password: 'pleasechangeme',
        })
        .expect((res) => {
          expect(res.body.status).toBe(Status.Success);
        });
    });

    it('should return error when signing up user with existing username', async () => {
      await request(app.getHttpServer()).post('/signup').send(newUser);

      await request(app.getHttpServer())
        .post('/signup')
        .send(newUser)
        .expect((res) => {
          expect(res.body.status).toBe(Status.Error);
        });
    });
  });

  describe('GET /tasks', () => {
    it('should return success response with tasks when provided correct token', async () => {
      const loginRequest = await request(app.getHttpServer())
        .post('/login')
        .send(existingUser);

      return request(app.getHttpServer())
        .get('/tasks')
        .set('Authorization', `Bearer ${loginRequest.body.data}`)
        .set('Content-Type', 'application/json')
        .send()
        .expect((res) => {
          expect(res.body.status).toBe(Status.Success);
        });
    });

    it('should return unauthorized error when provided incorrect token', async () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .set('Authorization', `Bearer 1ncorr3ct_token`)
        .set('Content-Type', 'application/json')
        .send()
        .expect(401);
    });
  });

  describe('POST /task', () => {
    it('should return success response with tasks when provided correct token', async () => {
      const task: Task = {
        id: '1',
        title: 'Lorem ipsum',
        description: 'Dolor es',
        state: {
          id: '1',
          value: 'IN_PROGRESS',
          iconName: 'progress',
          color: 'white',
        },
        isHidden: false,
        creationDate: new Date(2023, 1, 2).toISOString(),
        startDate: new Date(2023, 1, 3).toISOString(),
      };

      const loginRequest = await request(app.getHttpServer())
        .post('/login')
        .send(existingUser);

      return request(app.getHttpServer())
        .post('/task')
        .set('Authorization', `Bearer ${loginRequest.body.data}`)
        .set('Content-Type', 'application/json')
        .send(task)
        .expect((res) => {
          expect(res.body.status).toBe(Status.Success);
          expect(res.body.data.title).toBe(task.title);
          expect(res.body.data.description).toBe(task.description);
          expect(res.body.data.state.value).toBe(task.state.value);
          expect(res.body.data.isHidden).toBe(task.isHidden);
          expect(res.body.data.startDate).toBe(task.startDate);
        });
    });
  });
});
