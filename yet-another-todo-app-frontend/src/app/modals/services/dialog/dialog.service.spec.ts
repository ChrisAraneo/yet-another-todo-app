import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSortable } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AddTaskModalComponent } from 'src/app/modals/components/add-task-modal/add-task-modal.component';
import { DeleteTaskModalComponent } from 'src/app/modals/components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from 'src/app/modals/components/edit-task-modal/edit-task-modal.component';
import { SignInModalComponent } from 'src/app/modals/components/sign-in-modal/sign-in-modal.component';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
} from 'src/app/shared/models/task-state.model';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { DIALOG_WIDTH } from 'src/app/shared/styles/theme';
import { environment } from 'src/environments/environment';
import { ConfigureTableModalComponent } from '../../components/configure-table-modal/configure-table-modal.component';
import { ConfigureTimelineModalComponent } from '../../components/configure-timeline-modal/configure-timeline-modal.component';
import { ExportTasksModalComponent } from '../../components/export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from '../../components/import-tasks-modal/import-tasks-modal.component';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  let matDialog: MatDialog;
  const dummyConfiguration = {
    timeline: {
      startDate: new Date('2023-01-02'),
      endDate: new Date('2023-02-02'),
      order: [
        new NotStartedTaskState(),
        new InProgressTaskState(),
        new CompletedTaskState(),
        new SuspendedTaskState(),
        new RejectedTaskState(),
      ],
      filter: [new InProgressTaskState(), new CompletedTaskState()],
    },
    table: {
      sort: {
        id: '',
        start: '',
        disableClear: false,
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(AddTaskModalComponent),
        MockComponent(EditTaskModalComponent),
        MockComponent(DeleteTaskModalComponent),
        MockComponent(SignInModalComponent),
        MockComponent(ExportTasksModalComponent),
        MockComponent(ImportTasksModalComponent),
        MockComponent(ConfigureTimelineModalComponent),
        MockComponent(ConfigureTableModalComponent),
      ],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: 'API', useValue: environment.api },
        MockProvider(Store, {
          select: () => {
            return of({ ...dummyConfiguration });
          },
        }),
        MockProvider(TasksService, {}),
        MockProvider(TranslateService, {}),
        MockProvider(ViewConfigurationService, {
          getTimelineConfiguration: () => of(dummyConfiguration.timeline),
          getTableConfiguration: () => of({ ...dummyConfiguration.table } as { sort: MatSortable }),
        }),
        FormBuilder,
      ],
    });
    service = TestBed.inject(DialogService);
    matDialog = service.dialog;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#openAddTaskModal should open dialog with AddTaskModalComponent', () => {
    spyOn(matDialog, 'open').and.callThrough();

    service.openAddTaskModal();

    expect(matDialog.open).toHaveBeenCalledWith(AddTaskModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: AddTaskModalComponent.PANEL_CLASS,
    });
  });

  it('#openEditTaskModal should open dialog with EditTaskModalComponent', () => {
    const taskId = 'taskId';
    spyOn(matDialog, 'open').and.callThrough();

    service.openEditTaskModal(taskId);

    expect(matDialog.open).toHaveBeenCalledWith(EditTaskModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: EditTaskModalComponent.PANEL_CLASS,
      data: {
        initialTaskId: taskId,
      },
    });
  });

  it('#openDeleteTaskModal should open dialog with DeleteTaskModalComponent', () => {
    const taskId = 'taskId';
    spyOn(matDialog, 'open').and.callThrough();

    service.openDeleteTaskModal(taskId);

    expect(matDialog.open).toHaveBeenCalledWith(DeleteTaskModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: DeleteTaskModalComponent.PANEL_CLASS,
      data: {
        initialTaskId: taskId,
      },
    });
  });

  it('#openSignInModal should open dialog with SignInModalComponent', () => {
    spyOn(matDialog, 'open').and.callThrough();

    service.openSignInModal();

    expect(matDialog.open).toHaveBeenCalledWith(SignInModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: SignInModalComponent.PANEL_CLASS,
    });
  });

  it('#openExportTasksModal should open dialog with ExportTasksModalComponent', () => {
    spyOn(matDialog, 'open').and.callThrough();

    service.openExportTasksModal();

    expect(matDialog.open).toHaveBeenCalledWith(ExportTasksModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: ExportTasksModalComponent.PANEL_CLASS,
    });
  });

  it('#openImportTasksModal should open dialog with ImportTasksModalComponent', () => {
    spyOn(matDialog, 'open').and.callThrough();

    service.openImportTasksModal();

    expect(matDialog.open).toHaveBeenCalledWith(ImportTasksModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: ImportTasksModalComponent.PANEL_CLASS,
    });
  });

  it('#openConfigureTimelineModal should open dialog with ConfigureTimelineModalComponent', () => {
    spyOn(matDialog, 'open').and.callThrough();

    service.openConfigureTimelineModal();

    expect(matDialog.open).toHaveBeenCalledWith(ConfigureTimelineModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: ConfigureTimelineModalComponent.PANEL_CLASS,
      data: {
        startDate: dummyConfiguration.timeline.startDate,
        endDate: dummyConfiguration.timeline.endDate,
        statesOrder: dummyConfiguration.timeline.order,
        statesFilter: dummyConfiguration.timeline.filter,
      },
    });
  });

  it('#openConfigureTableModal should open dialog with ConfigureTableModalComponent', () => {
    spyOn(matDialog, 'open').and.callThrough();

    service.openConfigureTableModal();

    expect(matDialog.open).toHaveBeenCalledWith(ConfigureTableModalComponent, {
      width: DIALOG_WIDTH,
      panelClass: ConfigureTableModalComponent.PANEL_CLASS,
      data: {
        id: dummyConfiguration.table.sort.id,
        direction: dummyConfiguration.table.sort.start,
      },
    });
  });
});
