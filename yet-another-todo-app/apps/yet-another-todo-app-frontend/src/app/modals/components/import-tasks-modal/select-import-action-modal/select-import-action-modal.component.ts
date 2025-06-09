import { NgSwitch } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom, tap } from 'rxjs';

import { Task } from '../../../../../../../yet-another-todo-app-shared';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { ZipFileContent } from '../../../../shared/models/zip-file-content.type';
import { TasksService } from '../../../../shared/services/tasks/tasks.service';
import { NOOP } from '../../../../shared/utils/noop.const';
import { fadeInOut } from '../../../animations/fade-in-out.animation';
import { ModalActionButtonsComponent } from '../../modal-action-buttons/modal-action-buttons.component';
import { ModalTitleComponent } from '../../modal-title/modal-title.component';
import { PageComponent } from '../../page/page.component';
import { ImportAction } from './select-import-action-modal.types';

@Component({
  selector: 'yata-select-import-action-modal',
  templateUrl: './select-import-action-modal.component.html',
  styleUrl: './select-import-action-modal.component.scss',
  animations: [fadeInOut],
  standalone: true,
  imports: [
    FormsModule,
    MatRadioModule,
    NgSwitch,
    TranslatePipe,
    ImageComponent,
    ModalTitleComponent,
    PageComponent,
    ModalActionButtonsComponent,
  ],
})
export class SelectImportActionModalComponent {
  static readonly PANEL_CLASS = 'select-import-action-modal';

  readonly actions: ImportAction[] = Object.values(ImportAction);

  action: ImportAction = ImportAction.AddNewAndUpdateExisting;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ZipFileContent,
    public dialogRef: MatDialogRef<SelectImportActionModalComponent>,
    private readonly tasksService: TasksService,
  ) {}

  submit = async (): Promise<void> =>
    this.data?.tasks
      ? firstValueFrom(
          this.tasksService.importTasks(this.data?.tasks, this.action).pipe(
            tap(() => {
              this.dialogRef.close();
            }),
          ),
        )
      : NOOP();
}
