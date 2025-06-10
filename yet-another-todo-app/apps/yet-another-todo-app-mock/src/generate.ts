import fs from 'node:fs';
import path from 'node:path';

import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  Task,
  TaskCreator,
  TaskState,
} from '@chris.araneo/yet-another-todo-app-shared';
import { faker } from '@faker-js/faker';
import { addDays } from 'date-fns';
import { get, set } from 'lodash';

import { LOREM_WORDS } from './utils/lorem-words.const';

const taskStates: TaskState[] = [
  new NotStartedTaskState(),
  new InProgressTaskState(),
  new SuspendedTaskState(),
  new CompletedTaskState(),
  new RejectedTaskState(),
];

const tasks: Task[] = [];

function generate(): void {
  const totalNumberOfTasks = process.argv[2] ? +process.argv[2] : 750;
  const defaultStorePath = path.normalize(`${process.cwd()}/assets/store.json`);
  const storePath = get(process.argv, '3') || defaultStorePath;

  const numberOfNotStartedTasks = Math.min(totalNumberOfTasks, 10);
  const startDate = addDays(new Date(), -365);
  const endDate = addDays(new Date(), 365);

  while (tasks.length < totalNumberOfTasks - numberOfNotStartedTasks) {
    let date = startDate;

    while (+date < +endDate) {
      if (tasks.length < totalNumberOfTasks - numberOfNotStartedTasks) {
        const taskState = taskStates[getRandomInt(1, taskStates.length - 1)];
        tasks.push(createRandomTask(date, date, taskState));
        date = addDays(date, 1);
      } else {
        date = endDate;
      }
    }
  }

  for (let index = 0; index < numberOfNotStartedTasks; index++) {
    tasks.push(createRandomTask(new Date(), null, taskStates[0]));
  }

  writeStoreFile(storePath, JSON.stringify(tasks));
}

function createRandomTask(
  startDate: Date,
  endDate: Date | null,
  taskState: TaskState,
): Task {
  const lorem = createRandomLine().split(' ');

  const data = {
    id: faker.string.uuid(),
    title: `${lorem[0]} ${lorem.length > 1 ? lorem[1] : ''}`.trim(),
    description: createRandomLine(),
    state: taskState,
    creationDate: startDate,
    isHidden: faker.datatype.boolean(),
    startDate: undefined,
    endDate: undefined,
  };

  if (taskState.toString() !== 'NOT_STARTED') {
    set(data, 'startDate', startDate);
  }

  if (
    taskState.toString() !== 'NOT_STARTED' &&
    taskState.toString() !== 'IN_PROGRESS' &&
    taskState.toString() !== 'SUSPENDED'
  ) {
    set(data, 'endDate', endDate);
  }

  return TaskCreator.create(data);
}

function getRandomInt(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

function writeStoreFile(filePath: string, fileContent: string): void {
  fs.writeFileSync(filePath, fileContent, 'utf8');
}

function createRandomLine(): string {
  let line = '';

  for (let index = 0; index < getRandomInt(1, 8); index++) {
    line += `${LOREM_WORDS[getRandomInt(0, LOREM_WORDS.length - 1)]} `;
  }

  line = line.trim();

  return line.charAt(0).toLocaleUpperCase() + line.slice(1);
}

generate();
