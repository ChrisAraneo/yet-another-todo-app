import { HttpLogItem } from '../../models/http-log-item.type';

export interface HttpLogState {
  get: {
    tasks: HttpLogItem[];
  };
  post: {
    signUp: HttpLogItem[];
    login: HttpLogItem[];
    refresh: HttpLogItem[];
    tasks: HttpLogItem[];
    task: HttpLogItem[];
  };
  delete: {
    task: HttpLogItem[];
    user: HttpLogItem[];
  };
}
