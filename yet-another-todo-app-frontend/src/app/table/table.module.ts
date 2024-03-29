import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { DialogService } from '../modals/services/dialog/dialog.service';
import { MaterialModule } from '../shared/material.module';
import { DateUtilsService } from '../shared/services/date-utils/date-utils.service';
import { TasksService } from '../shared/services/tasks/tasks.service';
import { SharedModule } from '../shared/shared.module';
import { SearchbarComponent } from './components/table/searchbar/searchbar.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [TableComponent, SearchbarComponent],
  imports: [
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
  ],
  providers: [DateUtilsService, DialogService, TasksService],
  exports: [TableComponent],
})
export class TableModule {}
