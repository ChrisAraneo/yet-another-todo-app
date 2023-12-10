import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter, first } from 'rxjs';
import { AddTaskModalComponent } from 'src/app/modals/components/add-task-modal/add-task-modal.component';
import { DeleteTaskModalComponent } from 'src/app/modals/components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from 'src/app/modals/components/edit-task-modal/edit-task-modal.component';
import { SignInModalComponent } from 'src/app/modals/components/sign-in-modal/sign-in-modal.component';
import { ZipFileContent } from 'src/app/shared/models/zip-file-content.type';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { DIALOG_WIDTH } from 'src/app/shared/styles/theme';
import { ConfigureTableModalComponent } from '../../components/configure-table-modal/configure-table-modal.component';
import { ConfigureTimelineModalComponent } from '../../components/configure-timeline-modal/configure-timeline-modal.component';
import { ConfigureTimelineModalData } from '../../components/configure-timeline-modal/configure-timeline-modal.types';
import { ExportTasksModalComponent } from '../../components/export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from '../../components/import-tasks-modal/import-tasks-modal.component';
import { SelectImportActionModalComponent } from '../../components/import-tasks-modal/select-import-action-modal/select-import-action-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    public dialog: MatDialog,
    private viewConfigurationService: ViewConfigurationService,
  ) {}

  openAddTaskModal(): Observable<any> {
    return this.openDialog(AddTaskModalComponent);
  }

  openEditTaskModal(initialTaskId?: string): Observable<any> {
    return this.openDialog(EditTaskModalComponent, { initialTaskId });
  }

  openDeleteTaskModal(initialTaskId?: string): Observable<any> {
    return this.openDialog(DeleteTaskModalComponent, { initialTaskId });
  }

  openSignInModal(): void {
    this.openDialog(SignInModalComponent);
  }

  openExportTasksModal(): void {
    this.openDialog(ExportTasksModalComponent);
  }

  openImportTasksModal(): void {
    this.openDialog(ImportTasksModalComponent)
      .pipe(
        first(),
        filter((result: any) => !!result),
      )
      .subscribe((result: ZipFileContent) => {
        this.openDialog(SelectImportActionModalComponent, result);
      });
  }

  openConfigureTimelineModal(): void {
    this.viewConfigurationService
      .getTimelineConfiguration()
      .pipe(first())
      .subscribe(({ startDate, endDate, order, filter }) => {
        this.openDialog<ConfigureTimelineModalData>(ConfigureTimelineModalComponent, {
          startDate,
          endDate,
          statesOrder: order,
          statesFilter: filter,
        });
      });
  }

  openConfigureTableModal(): void {
    this.viewConfigurationService
      .getTableConfiguration()
      .pipe(first())
      .subscribe(({ sort }) => {
        this.openDialog(ConfigureTableModalComponent, { id: sort.id, direction: sort.start });
      });
  }

  private openDialog<T>(component: ComponentType<any>, data?: T): Observable<any> {
    return this.dialog
      .open(component, {
        width: DIALOG_WIDTH,
        panelClass: (component as any)['PANEL_CLASS'] || 'undefined-panel-class',
        ...(data ? { data: { ...data } } : {}),
      })
      .afterClosed();
  }
}
