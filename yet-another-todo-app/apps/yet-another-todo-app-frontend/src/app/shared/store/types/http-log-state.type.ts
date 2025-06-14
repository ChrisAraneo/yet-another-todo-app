import { HttpLogItem } from '../../../../../../../libs/yet-another-todo-app-models/src/models/http-log-item.interface';

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
