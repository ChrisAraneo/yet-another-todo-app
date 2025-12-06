import { Environment } from './environment.interface';

const scheme = 'http';
const host = 'localhost';
const port = 9339;
const origin = `${scheme}://${host}:${port}`;

const signupEndpoint = `${origin}/signup`;
const loginEndpoint = `${origin}/login`;
const refreshEndpoint = `${origin}/refresh`;
const taskEndpoint = `${origin}/task`;
const tasksEndpoint = `${origin}/tasks`;
const userEndpoint = `${origin}/user`;

export const environment: Environment = {
  production: false,
  api: {
    host,
    port,
    origin,
    signupEndpoint,
    loginEndpoint,
    refreshEndpoint,
    taskEndpoint,
    tasksEndpoint,
    userEndpoint,
  },
};
