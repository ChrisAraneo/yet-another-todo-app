import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { SignInForm } from './sign-in-modal.types';

@Component({
  selector: 'yata-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent {
  static readonly PANEL_CLASS = 'sign-in-modal';

  readonly title = 'Sign in';

  form!: FormGroup<SignInForm>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SignInModalComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.initializeForm();
  }

  submit(): void {
    if (!this.form || this.form.invalid) {
      return;
    }

    this.userService.setUser(this.form.value.username || '', this.form.value.password || '');

    this.dialogRef.close();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<SignInForm>({
      username: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }
}
