import path from 'node:path';
import { Mock } from './app/mock';

const storePath = process.argv[2]
  ? process.argv[2]
  : path.join(__dirname, '../src/assets/store.json');
const generatedTasksNumber = process.argv[3] ? +process.argv[3] : 1000;

new Mock(storePath, generatedTasksNumber);
