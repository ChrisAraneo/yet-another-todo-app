import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import jsonDiff from 'json-diff';
import log4js from 'log4js';
import { Task, TaskCreator } from '@chris.araneo/yet-another-todo-app-models';
import { generate } from './generate';

// TODO: Refactoring

const ACCESS_TOKEN = 'M0CK_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const SUCCESS = 'success';
const ERROR = 'error';
const DIFF = 'diff';
const NOT_DIFF = 'not-diff';

export class Mock {
  private data: Task[] | null = null;
  private logger: log4js.Logger;

  constructor(
    private readonly storePath: string,
    private readonly generatedTasksNumber = 1000,
  ) {
    const server = express();
    const port = 9339;
    const responseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    this.logger = log4js.getLogger();
    this.logger.level = 'debug';

    this.generateStore();

    server.use(cors());
    server.use(bodyParser.json({ limit: '4mb' }));

    server.post('/signup', (request, response) => {
      this.logger.debug(
        'Received POST /signup request. Responding with success',
      );

      const { body } = request;

      response.set(responseHeaders).send(
        JSON.stringify({
          status: SUCCESS,
          data: {
            id: 'this_is_mock_id',
            name: body.name,
            username: body.username,
          },
        }),
      );
    });

    server.post('/login', (_, response) => {
      this.logger.debug(
        'Received POST /login request. Responding with example access token and refresh token.',
      );

      response.set(responseHeaders).send(
        JSON.stringify({
          status: SUCCESS,
          data: {
            accessToken: ACCESS_TOKEN,
            refreshToken: REFRESH_TOKEN,
          },
        }),
      );
    });

    server.post('/refresh', (_, response) => {
      this.logger.debug(
        'Received POST /refresh request. Responding with example access token and refresh token.',
      );

      response.set(responseHeaders).send(
        JSON.stringify({
          status: SUCCESS,
          data: {
            accessToken: ACCESS_TOKEN,
            refreshToken: REFRESH_TOKEN,
          },
        }),
      );
    });

    server.get('/tasks', (_, response) => {
      this.logger.debug('Received GET /tasks request');

      this.readStoreFileIfDataIsNull();

      this.logger.debug('Sending response to GET /tasks');

      response.set(responseHeaders).send(
        JSON.stringify({
          status: SUCCESS,
          data: this.data,
        }),
      );
    });

    server.post('/task', (request, response) => {
      this.logger.debug('Received POST /task request');

      this.readStoreFileIfDataIsNull();

      const task: unknown = request.body;

      if (this.createOrUpdateTask(task) === DIFF) {
        this.logger.debug('Writing store file');
        this.writeStoreFile(this.storePath, JSON.stringify(this.data));
      }

      this.logger.debug('Sending response to POST /task');
      response.set(responseHeaders).send({
        status: SUCCESS,
        data: task,
      });
    });

    server.post('/tasks', (request, response) => {
      this.logger.debug('Received POST /tasks request');

      this.readStoreFileIfDataIsNull();

      let hasChanged = false;
      ((request.body || []) as unknown[]).forEach((task: unknown) => {
        if (this.createOrUpdateTask(task) === DIFF) {
          hasChanged = true;
        }
      });

      if (hasChanged) {
        this.logger.debug('Writing store file');
        this.writeStoreFile(this.storePath, JSON.stringify(this.data));
      }

      this.logger.debug('Sending response to POST /task');
      response.set(responseHeaders).send({
        status: SUCCESS,
        data: this.data,
      });
    });

    server.delete('/task', (request, response) => {
      this.logger.debug('Received DELETE /task request');

      const task: unknown = request.body;

      if (!this.data) {
        this.logger.debug('Store data is empty, nothing to delete');

        this.logger.debug('Sending response to DELETE /task');
        response.set(responseHeaders).send({
          status: SUCCESS,
          data: task,
        });
      }

      const updatedData =
        this.data?.filter((item) => item.getId() !== task['id']) || null;

      if (jsonDiff.diff(updatedData, this.data)) {
        this.logger.debug('Updating store data');
        this.data = updatedData;

        this.logger.debug('Writing store file');
        this.writeStoreFile(this.storePath, JSON.stringify(updatedData));

        this.logger.debug('Sending response to DELETE /task');
        response.set(responseHeaders).send(task);
      } else {
        this.logger.debug('Sending response to DELETE /task');
        response.set(responseHeaders).send({
          status: SUCCESS,
          data: task,
        });
      }
    });

    server.delete('/user', (request, response) => {
      this.logger.debug('Received DELETE /user request');

      response.set(responseHeaders).send({
        status: SUCCESS,
        data: request.body,
      });
    });

    server.listen(port, () => {
      this.logger.debug(`Server started running at ${port}`);
    });
  }

  private generateStore(): void {
    this.logger.debug('Generating store file');
    generate(this.storePath, this.generatedTasksNumber);
  }

  private readStoreFileIfDataIsNull(): void {
    if (this.data === null) {
      this.logger.debug('Cache is empty');
      this.logger.debug('Reading store file');
      this.data = this.readStoreFile(this.storePath);
    }
  }

  private createOrUpdateTask(task: unknown): typeof DIFF | typeof NOT_DIFF {
    if (this.data === null) {
      this.data = [TaskCreator.create(task)];

      return DIFF;
    }

    const existingTaskIndex = this.data.findIndex(
      (item) => item.getId() === task['id'],
    );

    if (existingTaskIndex >= 0) {
      const existingTask = this.data[existingTaskIndex];

      if (jsonDiff.diff(existingTask, task)) {
        this.data[existingTaskIndex] = TaskCreator.create(task);

        return DIFF;
      } else {
        return NOT_DIFF;
      }
    } else if (this.data !== null) {
      this.data.push(TaskCreator.create(task));

      return DIFF;
    }
  }

  private writeStoreFile(filePath: string, fileContent: string): string {
    try {
      fs.writeFileSync(filePath, fileContent, 'utf-8');
    } catch (e) {
      return JSON.stringify({
        status: ERROR,
        message: e,
        data: null,
      });
    }

    return JSON.stringify({
      status: SUCCESS,
      data: null,
    });
  }

  private readStoreFile(filePath: string): Task[] | null {
    const content = fs.readFileSync(filePath);
    const array = JSON.parse(content.toString());

    return (array || null)?.map((item: unknown) => TaskCreator.create(item));
  }
}
