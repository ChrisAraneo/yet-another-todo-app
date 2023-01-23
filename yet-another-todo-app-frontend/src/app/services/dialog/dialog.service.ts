import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { EditTaskModalComponent } from 'src/app/components/edit-task-modal/edit-task-modal.component';
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

  openEditTaskModal(): void {
    this.dialog.open(EditTaskModalComponent, {
      width: this.DIALOG_WIDTH,
      height: this.DIALOG_HEIGHT,
      panelClass: EditTaskModalComponent.PANEL_CLASS,
    });
  }
}
