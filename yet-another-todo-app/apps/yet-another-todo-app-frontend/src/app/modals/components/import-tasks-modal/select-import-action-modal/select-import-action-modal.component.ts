import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, tap } from 'rxjs';
import { Task } from '../../../../../../../yet-another-todo-app-shared';
import { ImportAction } from './select-import-action-modal.types';
import { fadeInOut } from '../../../animations/fade-in-out.animation';
import { ZipFileContent } from '../../../../shared/models/zip-file-content.type';
import { TasksService } from '../../../../shared/services/tasks/tasks.service';
import { NOOP } from '../../../../shared/utils/noop.const';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { ModalTitleComponent } from '../../modal-title/modal-title.component';
import { PageComponent } from '../../page/page.component';
import { ModalActionButtonsComponent } from '../../modal-action-buttons/modal-action-buttons.component';
import { NgSwitch } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'yata-select-import-action-modal',
  templateUrl: './select-import-action-modal.component.html',
  styleUrls: ['./select-import-action-modal.component.scss'],
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
    private tasksService: TasksService,
  ) {}

  submit = (): Promise<void> => {
    if (this.data?.tasks) {
      return firstValueFrom(
        this.tasksService
          .importTasks(this.data?.tasks as Task[], this.action)
          .pipe(
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
