import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SignInForm } from './sign-in-modal.types';

@Component({
  selector: 'yata-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'sign-in-modal';

  form!: FormGroup<SignInForm>;

  private subscription?: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SignInModalComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.form || this.form.invalid) {
        reject();

        return;
      }

      const { username, password } = this.form.value;

      this.subscription = this.authService.signIn(username || '', password || '').subscribe(() => {
        resolve();
        this.dialogRef.close();
      });
    });
  };

  cancel = (): void => {
    this.dialogRef.close();
  };

  private initializeForm(): void {
    this.form = this.formBuilder.group<SignInForm>({
      username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    });
  }
}
