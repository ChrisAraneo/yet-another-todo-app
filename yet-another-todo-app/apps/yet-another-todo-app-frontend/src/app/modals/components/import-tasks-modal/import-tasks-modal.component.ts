import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

import { FileInputComponent } from '../../../forms/components/file-input/file-input.component';
import { PasswordInputComponent } from '../../../forms/components/password-input/password-input.component';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { UnzipTasksService } from '../../../shared/services/unzip-tasks/unzip-tasks.service';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { ModalActionButtonsComponent } from '../modal-action-buttons/modal-action-buttons.component';
import { ModalTitleComponent } from '../modal-title/modal-title.component';
import { PageComponent } from '../page/page.component';
import { ImportTasksForm } from './import-tasks-modal.types';

@Component({
  selector: 'yata-import-tasks-modal',
  templateUrl: './import-tasks-modal.component.html',
  styleUrl: './import-tasks-modal.component.scss',
  animations: [fadeInOut],
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    ImageComponent,
    ModalTitleComponent,
    PageComponent,
    FileInputComponent,
    PasswordInputComponent,
    ModalActionButtonsComponent,
  ],
})
export class ImportTasksModalComponent {
  static readonly PANEL_CLASS = 'import-tasks-modal';

  form!: FormGroup<ImportTasksForm>;
  unzipError?: Error;

  constructor(
    public dialogReference: MatDialogRef<ImportTasksModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly unzipTasksService: UnzipTasksService,
  ) {
    this.initializeForm();
  }

  submit = async (event: any): Promise<void> =>
    new Promise((resolve, reject) => {
      event.preventDefault();

      this.form.updateValueAndValidity();

      if (this.form.valid) {
        const { file, password } = this.form.value;

        this.unzipTasksService
          .unzip(file!, password || '')
          .then((result) => {
            resolve();
            this.dialogReference.close(result);
          })
          .catch((error: Error) => {
            this.unzipError = error;
            console.error(error);
            reject();
          });
      }
    });

  cancel = (): void => {
    this.dialogReference.close();
  };

  private initializeForm(): void {
    this.form = this.formBuilder.group<ImportTasksForm>({
      file: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true }),
    });
  }
}
