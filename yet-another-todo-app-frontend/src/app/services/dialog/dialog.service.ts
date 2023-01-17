import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly DIALOG_WIDTH = '800px';
  readonly DIALOG_HEIGHT = '600px';

  constructor(public dialog: MatDialog) {}

  openAddTaskModal(): void {
    this.dialog.open(AddTaskModalComponent, {
      width: this.DIALOG_WIDTH,
      height: this.DIALOG_HEIGHT,
      panelClass: AddTaskModalComponent.PANEL_CLASS,
    });
  }
}
