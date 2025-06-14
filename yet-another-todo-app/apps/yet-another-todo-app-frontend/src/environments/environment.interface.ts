export interface Environment {
  production: boolean;
  api: {
    host: string;
    port: number;
    origin: string;
    signupEndpoint: string;
    loginEndpoint: string;
    refreshEndpoint: string;
    taskEndpoint: string;
    tasksEndpoint: string;
    userEndpoint: string;
  }
}
