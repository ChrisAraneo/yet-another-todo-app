import { SignInData } from './sign-in-data.model';

export type CurrentUser = {
  user: SignInData;
  isLogged: boolean;
};
