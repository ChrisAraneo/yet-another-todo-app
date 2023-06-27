import { HttpLogType } from './http-log-type.enum';

export type HttpLogItem = {
  id: string;
  logType: HttpLogType;
  data: any;
  creationDate: Date;
};
