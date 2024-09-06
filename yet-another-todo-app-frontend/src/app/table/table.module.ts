import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TableModule as PrimeNgTableModule } from 'primeng/table';
import { AppRoutingModule } from '../app-routing.module';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '../forms/forms.module';
import { DialogService } from '../modals/services/dialog/dialog.service';
import { MaterialModule } from '../shared/material.module';
import { DateUtilsService } from '../shared/services/date-utils/date-utils.service';
import { TasksService } from '../shared/services/tasks/tasks.service';
import { SharedModule } from '../shared/shared.module';
import { NewTableComponent } from './components/new-table/new-table.component';
import { PageSizeSelectComponent } from './components/new-table/paginator/page-size-select/page-size-select.component';
import { PaginatorComponent } from './components/new-table/paginator/paginator.component';
import { SearchbarComponent } from './components/table/searchbar/searchbar.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    TableComponent,
    SearchbarComponent,
    NewTableComponent,
    PaginatorComponent,
    PageSizeSelectComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserModule,
    MaterialModule,
    PrimeNgTableModule,
    AngularFormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DateUtilsService, DialogService, TasksService],
  exports: [TableComponent, NewTableComponent],
})
export class TableModule {}
