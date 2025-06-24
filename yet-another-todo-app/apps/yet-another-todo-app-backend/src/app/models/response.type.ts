import { Status } from './status.enum';

export type Response<T> = {
  status: Status;
  statusCode?: number;
  data: T | null | undefined;
  message?: string;
};
