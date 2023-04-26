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
    it('should login and receive valid token', () => {
      return request(app.getHttpServer())
        .post('/login')
        .send(existingUser)
        .expect((res) => {
          expect(res.body.status).toBe(Status.Success);
        });
    });

    it('should reject login', () => {
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

    it('should return error when registering  new user and receive success response', async () => {
      await request(app.getHttpServer()).post('/signup').send(newUser);

      await request(app.getHttpServer())
        .post('/signup')
        .send(newUser)
        .expect((res) => {
          expect(res.body.status).toBe(Status.Error);
        });
    });
  });
});
