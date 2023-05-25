import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'yata-export-tasks-modal',
  templateUrl: './export-tasks-modal.component.html',
  styleUrls: ['./export-tasks-modal.component.scss'],
})
export class ExportTasksModalComponent {
  static readonly PANEL_CLASS = 'export-tasks-modal';

  constructor(public dialogRef: MatDialogRef<ExportTasksModalComponent>) {}
}
