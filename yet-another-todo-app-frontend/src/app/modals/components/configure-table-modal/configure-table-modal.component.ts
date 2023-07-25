import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'yata-configure-table-modal',
  templateUrl: './configure-table-modal.component.html',
  styleUrls: ['./configure-table-modal.component.scss'],
})
export class ConfigureTableModalComponent {
  static readonly PANEL_CLASS = 'configure-table-modal';

  form?: FormGroup<any>; // TODO Specify proper type

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfigureTableModalComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.initializeForm();
  }

  submit: () => Promise<void> = async () => {
    if (this.form === undefined || this.form?.invalid) {
      return;
    }

    this.dialogRef.close();
  };

  cancel: () => void = () => {
    this.dialogRef.close();
  };

  private initializeForm(): void {
    this.form = this.formBuilder.group<any>({});
  }
}
