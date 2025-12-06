import { HttpLogType } from "./http-log-type.enum";

export interface HttpLogItem {
  id: string;
  logType: HttpLogType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  creationDate: Date;
}
