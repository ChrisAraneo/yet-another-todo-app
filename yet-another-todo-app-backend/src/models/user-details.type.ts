import { UserInfo } from './user-info.type';

export type UserDetails = UserInfo & {
  id: string;
  refreshToken?: string; // TODO rename type??
};
