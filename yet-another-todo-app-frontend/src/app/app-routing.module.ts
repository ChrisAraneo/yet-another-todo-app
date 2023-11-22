import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/components/table/table.component';
import { TimelineComponent } from './timeline/components/timeline/timeline.component';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'table', component: TableComponent },
  { path: '', pathMatch: 'prefix', redirectTo: 'timeline' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
