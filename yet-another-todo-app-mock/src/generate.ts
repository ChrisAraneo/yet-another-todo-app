import { faker } from '@faker-js/faker';
import { addDays } from 'date-fns';
import fs from 'fs';
import path from 'path';
import { LOREM_WORDS } from './utils/lorem-words.const';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  Task,
  TaskCreator,
  TaskState,
} from '../../yet-another-todo-app-shared';

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
  const storePath = process.argv[3] ? process.argv[3] : path.join(__dirname, '../store/store.json');

  const numberOfNotStartedTasks = totalNumberOfTasks < 10 ? totalNumberOfTasks : 10;
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

  for (let i = 0; i < numberOfNotStartedTasks; i++) {
    tasks.push(createRandomTask(new Date(), undefined, taskStates[0]));
  }

  writeStoreFile(storePath, JSON.stringify(tasks));
}

function createRandomTask(startDate: Date, endDate: Date, taskState: TaskState): Task {
  const lorem = createRandomLine().split(' ');

  const data = {
    id: faker.datatype.uuid(),
    title: `${lorem[0]} ${lorem.length > 1 ? lorem[1] : ''}`.trim(),
    description: createRandomLine(),
    state: taskState,
    creationDate: startDate,
    isHidden: faker.datatype.boolean(),
    startDate: undefined,
    endDate: undefined,
  };

  if (taskState.toString() !== 'NOT_STARTED') {
    data.startDate = startDate;
  }

  if (
    taskState.toString() !== 'NOT_STARTED' &&
    taskState.toString() !== 'IN_PROGRESS' &&
    taskState.toString() !== 'SUSPENDED'
  ) {
    data.endDate = endDate;
  }

  return TaskCreator.create(data);
}

function getRandomInt(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

function writeStoreFile(filePath: string, fileContent: string): void {
  try {
    fs.writeFileSync(filePath, fileContent, 'utf-8');
  } catch (e) {
    throw e;
  }
}

function createRandomLine(): string {
  let line = '';

  for (let i = 0; i < getRandomInt(1, 8); i++) {
    line += LOREM_WORDS[getRandomInt(0, LOREM_WORDS.length - 1)] + ' ';
  }

  line = line.trim();

  return line.charAt(0).toLocaleUpperCase() + line.slice(1);
}

generate();
