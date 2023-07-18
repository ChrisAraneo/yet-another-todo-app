import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigureTimelineForm } from './configure-timeline-modal.types';

@Component({
  selector: 'yata-configure-timeline-modal',
  templateUrl: './configure-timeline-modal.component.html',
  styleUrls: ['./configure-timeline-modal.component.scss'],
})
export class ConfigureTimelineModalComponent {
  static readonly PANEL_CLASS = 'configure-timeline-modal';

  form?: FormGroup<ConfigureTimelineForm>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfigureTimelineModalComponent>,
    private formBuilder: FormBuilder,
  ) {}

  submit: () => Promise<void> = async () => {
    return;
  };

  cancel: () => void = () => {
    this.dialogRef.close();
  };
}
