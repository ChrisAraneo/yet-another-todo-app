import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

type SignupRequest = {
  username: string;
  password: string;
  name: string;
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: SignupRequest;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    user = {
      name: 'E2E Test User',
      username: 'end2endTestUser',
      password: 'pleasechangeme',
    };

    await app.init();

    await request(app.getHttpServer()).post('/signup').send(user);
  });

  afterEach(async () => {
    await request(app.getHttpServer()).delete('/user').send(user);
  });

  describe('Login', () => {
    it('should login and receive valid token', () => {
      return request(app.getHttpServer()).post('/login').send(user).expect(201);
    });

    it('should reject login', () => {
      return request(app.getHttpServer())
        .post('/login')
        .send({ ...user, password: `${user.password}#` })
        .expect(401);
    });
  });
});
