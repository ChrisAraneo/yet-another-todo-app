import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskModalLauncherComponent } from './modals/components/add-task-modal-launcher/add-task-modal-launcher.component';
import { TableComponent } from './table/components/table/table.component';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

const modalRoutes: Routes = [
  {
    path: 'add-task',
    component: AddTaskModalLauncherComponent,
  },
];

const routes: Routes = [
  {
    path: 'timeline',
    component: TimelineComponent,
    children: modalRoutes,
  },
  {
    path: 'table',
    component: TableComponent,
    children: modalRoutes,
  },
  { path: '', pathMatch: 'prefix', redirectTo: 'timeline' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
