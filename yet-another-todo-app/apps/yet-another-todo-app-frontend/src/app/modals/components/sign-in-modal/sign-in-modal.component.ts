import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SignInForm } from './sign-in-modal.types';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PageComponent } from '../page/page.component';
import { TextInputComponent } from '../../../forms/components/text-input/text-input.component';
import { PasswordInputComponent } from '../../../forms/components/password-input/password-input.component';
import { ModalActionButtonsComponent } from "../modal-action-buttons/modal-action-buttons.component";

@Component({
  selector: 'yata-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '300ms',
          keyframes([
            style({ opacity: 0 }),
            style({ opacity: 0 }),
            style({ opacity: 1 }),
          ]),
        ),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
  ],
  standalone: true,
  imports: [
    LogoComponent,
    TitleComponent,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    PageComponent,
    TextInputComponent,
    PasswordInputComponent,
    ModalActionButtonsComponent
],
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

      this.subscription = this.authService
        .signIn(username || '', password || '')
        .subscribe(() => {
          resolve();
          this.dialogRef.close();
        });
    });
  };

  cancel = (): void => {
    this.authService.signOut();
    this.dialogRef.close();
  };

  private initializeForm(): void {
    this.form = this.formBuilder.group<SignInForm>({
      username: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
}
