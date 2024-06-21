import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, tap } from 'rxjs';
import { fadeInOut } from 'src/app/modals/animations/fade-in-out.animation';
import { ZipFileContent } from 'src/app/shared/models/zip-file-content.type';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { NOOP } from 'src/app/shared/utils/noop.const';
import { Task } from '../../../../../../../yet-another-todo-app-shared';
import { ImportAction } from './select-import-action-modal.types';

@Component({
  selector: 'yata-select-import-action-modal',
  templateUrl: './select-import-action-modal.component.html',
  styleUrls: ['./select-import-action-modal.component.scss'],
  animations: [fadeInOut],
})
export class SelectImportActionModalComponent {
  static readonly PANEL_CLASS = 'select-import-action-modal';

  readonly actions: ImportAction[] = Object.values(ImportAction);

  action: ImportAction = ImportAction.AddNewAndUpdateExisting;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ZipFileContent,
    public dialogRef: MatDialogRef<SelectImportActionModalComponent>,
    private tasksService: TasksService,
  ) {}

  submit = (): Promise<void> => {
    if (this.data?.tasks) {
      return firstValueFrom(
        this.tasksService.importTasks(this.data?.tasks as Task[], this.action).pipe(
          tap(() => {
            this.dialogRef.close();
          }),
        ),
      );
    } else {
      return NOOP();
    }
  };
}
