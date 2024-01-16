import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ADD_TASK_PATH,
  DELETE_TASK_PATH,
  EDIT_TASK_PATH,
  EXPORT_TASKS_PATH,
  TABLE_PATH,
  TIMELINE_PATH,
} from './app-routing.consts';
import { AddTaskModalLauncherComponent } from './modals/components/add-task-modal-launcher/add-task-modal-launcher.component';
import { DeleteTaskModalLauncherComponent } from './modals/components/delete-task-modal-launcher/delete-task-modal-launcher.component';
import { EditTaskModalLauncherComponent } from './modals/components/edit-task-modal-launcher/edit-task-modal-launcher.component';
import { ExportTasksModalLauncherComponent } from './modals/components/export-tasks-modal-launcher/export-tasks-modal-launcher.component';
import { TableComponent } from './table/components/table/table.component';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

const modalRoutes: Routes = [
  {
    path: ADD_TASK_PATH,
    component: AddTaskModalLauncherComponent,
  },
  {
    path: EDIT_TASK_PATH,
    component: EditTaskModalLauncherComponent,
  },
  {
    path: DELETE_TASK_PATH,
    component: DeleteTaskModalLauncherComponent,
  },
  {
    path: EXPORT_TASKS_PATH,
    component: ExportTasksModalLauncherComponent,
  },
];

const routes: Routes = [
  {
    path: TIMELINE_PATH,
    component: TimelineComponent,
    children: modalRoutes,
  },
  {
    path: TABLE_PATH,
    component: TableComponent,
    children: modalRoutes,
  },
  { path: '', pathMatch: 'full', redirectTo: TIMELINE_PATH },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
