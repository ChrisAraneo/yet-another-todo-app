import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first, from, mergeMap, Observable } from 'rxjs';

import { ZipFileContent } from '../../../shared/models/zip-file-content.type';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import { ViewConfigurationService } from '../../../shared/services/view-configuration/view-configuration.service';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';
import { ConfigureTableModalComponent } from '../../components/configure-table-modal/configure-table-modal.component';
import { ConfigureTimelineModalComponent } from '../../components/configure-timeline-modal/configure-timeline-modal.component';
import { ConfigureTimelineModalData } from '../../components/configure-timeline-modal/configure-timeline-modal.types';
import { DeleteTaskModalComponent } from '../../components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from '../../components/edit-task-modal/edit-task-modal.component';
import { EmptyDialogComponent } from '../../components/empty-dialog/empty-dialog.component';
import { EmptyDialogData } from '../../components/empty-dialog/empty-dialog.types';
import { ExportTasksModalComponent } from '../../components/export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from '../../components/import-tasks-modal/import-tasks-modal.component';
import { SelectImportActionModalComponent } from '../../components/import-tasks-modal/select-import-action-modal/select-import-action-modal.component';
import { SignInModalComponent } from '../../components/sign-in-modal/sign-in-modal.component';
import { DIALOG_HEIGHT, DIALOG_WIDTH } from '@chris.araneo/yet-another-todo-app-shared/src/themes/theme.__generated';

// TODO Move to shared?
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    public dialog: MatDialog,
    private readonly viewConfigurationService: ViewConfigurationService,
    private readonly navigationService: NavigationService,
  ) {}

  openAddTaskModal(): Observable<any> {
    return this.openDialog(AddTaskModalComponent);
  }

  openEditTaskModal(initialTaskId?: string): Observable<any> {
    return this.openDialog(EditTaskModalComponent, { initialTaskId });
  }

  navigateToEditTaskModal(initialTaskId: string): Observable<boolean> {
    // TODO Move this method to different service ?? What was the purpose
    return from(this.navigationService.navigateToEditTaskRoute(initialTaskId));
  }

  openDeleteTaskModal(initialTaskId?: string): Observable<any> {
    return this.openDialog(DeleteTaskModalComponent, { initialTaskId });
  }

  openSignInModal(): Observable<any> {
    return this.openDialog(SignInModalComponent);
  }

  openExportTasksModal(): Observable<any> {
    return this.openDialog(ExportTasksModalComponent);
  }

  openImportTasksModal(): Observable<any> {
    return this.openDialog(ImportTasksModalComponent).pipe(
      first(),
      filter(Boolean),
      mergeMap((result: ZipFileContent) =>
        this.openDialog(SelectImportActionModalComponent, result),
      ),
    );
  }

  openConfigureTimelineModal(): Observable<any> {
    return this.viewConfigurationService.getTimelineConfiguration().pipe(
      first(),
      mergeMap(({ startDate, endDate, order, filter }) =>
        this.openDialog<ConfigureTimelineModalData>(
          ConfigureTimelineModalComponent,
          {
            startDate,
            endDate,
            statesOrder: order,
            statesFilter: filter,
          },
        ),
      ),
    );
  }

  openConfigureTableModal(): Observable<any> {
    return this.viewConfigurationService.getTableConfiguration().pipe(
      first(),
      mergeMap(({ sort }) =>
        this.openDialog(ConfigureTableModalComponent, {
          id: sort.id,
          direction: sort.start,
        }),
      ),
    );
  }

  openEmptyDialog(title: string, hint: string): Observable<any> {
    return this.openDialog<EmptyDialogData>(EmptyDialogComponent, {
      titleKey: title,
      hintKey: hint,
    });
  }

  private openDialog<T>(
    component: ComponentType<any>,
    data?: T,
  ): Observable<any> {
    return this.dialog
      .open(component, {
        width: DIALOG_WIDTH,
        height: DIALOG_HEIGHT,
        panelClass: (component as any).PANEL_CLASS || 'undefined-panel-class',
        ...(data ? { data: { ...data } } : {}),
      })
      .afterClosed();
  }
}
