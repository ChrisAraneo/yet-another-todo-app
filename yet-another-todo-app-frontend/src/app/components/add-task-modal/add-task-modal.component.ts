import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'yata-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
})
export class AddTaskModalComponent {
  static readonly PANEL_CLASS = 'add-task-modal';

  constructor(public dialogRef: MatDialogRef<AddTaskModalComponent>) {}
}
