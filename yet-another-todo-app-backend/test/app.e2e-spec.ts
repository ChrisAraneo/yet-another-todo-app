import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Status } from '../src/models/status.enum';
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
    await request(app.getHttpServer()).delete('/user').send(existingUser);
    await request(app.getHttpServer()).delete('/user').send(newUser);
  });

  describe('Login', () => {
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

  describe('Sign up', () => {
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

  describe('Tasks', () => {
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
});
