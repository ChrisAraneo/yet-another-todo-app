import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ADD_TASK_PATH,
  CONFIGURE_PATH,
  DELETE_TASK_PATH,
  EDIT_TASK_PATH,
  EXPORT_TASKS_PATH,
  IMPORT_TASKS_PATH,
  SIGN_IN_PATH,
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
import { SignInModalComponent } from './modals/components/sign-in-modal/sign-in-modal.component';
import { canActivateAuth } from './shared/guards/auth/auth.guard';
import { TableComponent } from './table/components/table/table.component';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

const commonModalRoutes: Routes = [
  {
    path: ADD_TASK_PATH,
    component: ModalLauncherComponent,
    canActivate: [canActivateAuth],
    data: {
      modal: AddTaskModalComponent,
    },
  },
  {
    path: `${ADD_TASK_PATH}/${SIGN_IN_PATH}`,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
  {
    path: `${EDIT_TASK_PATH}/:id`,
    component: ModalLauncherComponent,
    canActivate: [canActivateAuth],
    data: {
      modal: EditTaskModalComponent,
    },
  },
  {
    path: `${EDIT_TASK_PATH}/:id/${SIGN_IN_PATH}`,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
  {
    path: `${DELETE_TASK_PATH}/:id`,
    component: ModalLauncherComponent,
    canActivate: [canActivateAuth],
    data: {
      modal: DeleteTaskModalComponent,
    },
  },
  {
    path: `${DELETE_TASK_PATH}/:id/${SIGN_IN_PATH}`,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
  {
    path: EXPORT_TASKS_PATH,
    component: ModalLauncherComponent,
    canActivate: [canActivateAuth],
    data: {
      modal: ExportTasksModalComponent,
    },
  },
  {
    path: `${EXPORT_TASKS_PATH}/${SIGN_IN_PATH}`,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
  {
    path: IMPORT_TASKS_PATH,
    component: ModalLauncherComponent,
    canActivate: [canActivateAuth],
    data: {
      modal: ImportTasksModalComponent,
    },
  },
  {
    path: `${IMPORT_TASKS_PATH}/${SIGN_IN_PATH}`,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
];

const routes: Routes = [
  {
    path: SIGN_IN_PATH,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
  {
    path: TIMELINE_PATH,
    component: TimelineComponent,
    canActivate: [canActivateAuth],
    canActivateChild: [canActivateAuth],
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
    path: `${TIMELINE_PATH}/${SIGN_IN_PATH}`,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
  {
    path: TABLE_PATH,
    component: TableComponent,
    canActivate: [canActivateAuth],
    canActivateChild: [canActivateAuth],
    children: [
      ...commonModalRoutes,
      {
        path: CONFIGURE_PATH,
        component: ModalLauncherComponent,
        canActivate: [canActivateAuth],
        data: {
          modal: ConfigureTableModalComponent,
        },
      },
    ],
  },
  {
    path: `${TABLE_PATH}/${SIGN_IN_PATH}`,
    component: ModalLauncherComponent,
    data: {
      modal: SignInModalComponent,
    },
  },
  { path: '', pathMatch: 'full', redirectTo: SIGN_IN_PATH },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
