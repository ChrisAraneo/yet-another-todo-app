import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskModalComponent } from 'src/app/components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from 'src/app/components/edit-task-modal/edit-task-modal.component';
import { SignInModalComponent } from 'src/app/components/sign-in-modal/sign-in-modal.component';
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

  openDeleteTaskModal(initialTaskId?: string): void {
    this.dialog.open(DeleteTaskModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: DeleteTaskModalComponent.PANEL_CLASS,
      data: { initialTaskId },
    });
  }

  openSignInModal(): void {
    this.dialog.open(SignInModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: SignInModalComponent.PANEL_CLASS,
    });
  }
}
