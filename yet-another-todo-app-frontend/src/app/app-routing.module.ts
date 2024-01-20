import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ADD_TASK_PATH,
  CONFIGURE_PATH,
  DELETE_TASK_PATH,
  EDIT_TASK_PATH,
  EXPORT_TASKS_PATH,
  IMPORT_TASKS_PATH,
  TABLE_PATH,
  TIMELINE_PATH,
} from './app-routing.consts';
import { AddTaskModalComponent } from './modals/components/add-task-modal/add-task-modal.component';
import { ConfigureTableModalComponent } from './modals/components/configure-table-modal/configure-table-modal.component';
import { ConfigureTimelineModalComponent } from './modals/components/configure-timeline-modal/configure-timeline-modal.component';
import { DeleteTaskModalComponent } from './modals/components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from './modals/components/edit-task-modal/edit-task-modal.component';
import { ExportTasksModalComponent } from './modals/components/export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from './modals/components/import-tasks-modal/import-tasks-modal.component';
import { ModalLauncherComponent } from './modals/components/modal-launcher/modal-launcher.component';
import { TableComponent } from './table/components/table/table.component';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

const commonModalRoutes: Routes = [
  {
    path: ADD_TASK_PATH,
    component: ModalLauncherComponent,
    data: {
      modal: AddTaskModalComponent,
    },
  },
  {
    path: EDIT_TASK_PATH,
    component: ModalLauncherComponent,
    data: {
      modal: EditTaskModalComponent,
    },
  },
  {
    path: DELETE_TASK_PATH,
    component: ModalLauncherComponent,
    data: {
      modal: DeleteTaskModalComponent,
    },
  },
  {
    path: EXPORT_TASKS_PATH,
    component: ModalLauncherComponent,
    data: {
      modal: ExportTasksModalComponent,
    },
  },
  {
    path: IMPORT_TASKS_PATH,
    component: ModalLauncherComponent,
    data: {
      modal: ImportTasksModalComponent,
    },
  },
];

const routes: Routes = [
  {
    path: TIMELINE_PATH,
    component: TimelineComponent,
    children: [
      ...commonModalRoutes,
      {
        path: CONFIGURE_PATH,
        component: ModalLauncherComponent,
        data: {
          modal: ConfigureTimelineModalComponent,
        },
      },
    ],
  },
  {
    path: TABLE_PATH,
    component: TableComponent,
    children: [
      ...commonModalRoutes,
      {
        path: CONFIGURE_PATH,
        component: ModalLauncherComponent,
        data: {
          modal: ConfigureTableModalComponent,
        },
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: TIMELINE_PATH },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
