import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'yata-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  static readonly PANEL_CLASS = 'edit-task-modal';

  readonly title = 'Edit task';

  constructor(public dialogRef: MatDialogRef<EditTaskModalComponent>) {}
}
