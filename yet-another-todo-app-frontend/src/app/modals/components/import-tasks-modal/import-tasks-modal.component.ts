import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { UnzipTasksService } from 'src/app/shared/services/unzip-tasks/unzip-tasks.service';
import { ImportTasksForm } from './import-tasks-modal.types';

@Component({
  selector: 'yata-import-tasks-modal',
  templateUrl: './import-tasks-modal.component.html',
  styleUrls: ['./import-tasks-modal.component.scss'],
})
export class ImportTasksModalComponent {
  static readonly PANEL_CLASS = 'import-tasks-modal';

  form!: FormGroup<ImportTasksForm>;
  unzipError?: Error;
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    public dialogRef: MatDialogRef<ImportTasksModalComponent>,
    private formBuilder: FormBuilder,
    private unzipTasksService: UnzipTasksService,
  ) {
    this.initializeForm();
  }

  submit(event: any): void {
    event.preventDefault();

    this.form.updateValueAndValidity();

    if (this.form.valid) {
      const { file, password } = this.form.value;

      this.isLoading.next(true);

      this.unzipTasksService
        .unzip(file as ArrayBuffer, password || '')
        .then((result) => {
          this.isLoading.next(false);
          this.dialogRef.close(result);
        })
        .catch((error: Error) => {
          this.isLoading.next(false);
          this.unzipError = error;
          console.error(error);
        });
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<ImportTasksForm>({
      file: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true }),
    });
  }
}
