import { Status } from './status.enum';

export type Response<T> = {
  status: Status;
  data: T | null;
  message?: string;
};
