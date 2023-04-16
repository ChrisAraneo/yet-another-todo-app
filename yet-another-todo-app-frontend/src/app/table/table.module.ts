import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from '../material.module';
import { DialogService } from '../modals/services/dialog/dialog.service';
import { DateUtilsService } from '../services/date-utils/date-utils.service';
import { TasksService } from '../services/tasks/tasks.service';
import { SharedModule } from '../shared/shared.module';
import { SearchbarComponent } from './components/table/searchbar/searchbar.component';
import { TableComponent } from './components/table/table.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

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
