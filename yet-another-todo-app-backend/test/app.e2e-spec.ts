import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let response: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    response =
      '[{"title":"Lorem ipsum dolor sit","description":"Nam consectetur tempus hendrerit. Nullam pharetra, risus eget feugiat maximus, tellus magna dignissim eros, at pulvinar nisi purus vitae lectus.","state":{"value":"IN_PROGRESS","iconName":"autorenew","color":"orange","tooltipText":"Task in progress"},"creationDate":"2023-03-01T19:43:44.738Z","id":"8e7f40b7-71a2-44fa-b112-8539c1cc068c","startDate":"2023-03-01T19:43:44.738Z"},{"title":"Curabitur ornare fringilla","description":"Proin nulla ligula, cursus vel sapien in, euismod placerat elit. Vestibulum volutpat lectus id tempor pellentesque. Vestibulum suscipit vulputate augue sit amet porttitor. Sed eget cursus tortor. Ut a enim et dolor aliquet interdum sit amet porttitor sem.","state":{"value":"IN_PROGRESS","iconName":"autorenew","color":"orange","tooltipText":"Task in progress"},"creationDate":"2023-03-02T15:45:44.738Z","id":"8e7f40b7-71a2-44fa-b112-8539c1cc068c","startDate":"2023-03-02T16:45:44.738Z"}]';

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect(response);
  });
});
