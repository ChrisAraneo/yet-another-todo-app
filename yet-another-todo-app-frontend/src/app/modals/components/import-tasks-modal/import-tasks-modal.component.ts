import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

      this.unzipTasksService.unzip(file as ArrayBuffer, password || '').then((result) => {
        console.log('UNZIP RESULT', result);

        // TODO Store unzipped content

        this.dialogRef.close();
      });
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<ImportTasksForm>({
      file: new FormControl(null),
      password: new FormControl('', { nonNullable: true }),
    });
  }
}
