import 'zone.js/plugins/zone-error';

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

export const environment = {
  production: false,
  api: {
    host: host,
    port: port,
    origin: origin,
    signupEndpoint: signupEndpoint,
    loginEndpoint: loginEndpoint,
    refreshEndpoint: refreshEndpoint,
    taskEndpoint: taskEndpoint,
    tasksEndpoint: tasksEndpoint,
    userEndpoint: userEndpoint,
  },
};
