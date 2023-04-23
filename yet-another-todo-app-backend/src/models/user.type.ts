import { UserInfo } from './user-info.type';

export type User = UserInfo & {
  id: string;
  password: string; // TODO Security!
};
