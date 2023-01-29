import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { EditTaskModalComponent } from 'src/app/components/edit-task-modal/edit-task-modal.component';
import { DIALOG_WIDTH } from 'src/app/shared/theme';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openAddTaskModal(): void {
    this.dialog.open(AddTaskModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: AddTaskModalComponent.PANEL_CLASS,
    });
  }

  openEditTaskModal(): void {
    this.dialog.open(EditTaskModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: EditTaskModalComponent.PANEL_CLASS,
    });
  }
}
