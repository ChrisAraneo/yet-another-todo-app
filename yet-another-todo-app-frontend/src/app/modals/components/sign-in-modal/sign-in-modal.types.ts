import { FormControl } from '@angular/forms';

export type SignInForm = {
  username: FormControl<string>;
  password: FormControl<string>;
};
