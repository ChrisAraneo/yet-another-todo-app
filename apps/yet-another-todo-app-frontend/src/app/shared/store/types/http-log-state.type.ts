import { HttpLogItem } from '@chris.araneo/yet-another-todo-app-models';

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
