import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  openEditTaskModal(initialTaskId?: string): void {
    this.dialog.open(EditTaskModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: EditTaskModalComponent.PANEL_CLASS,
      data: { initialTaskId },
    });
  }
}
