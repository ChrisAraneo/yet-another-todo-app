import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EmptyInfoBoxComponent } from './components/empty-info-box/empty-info-box.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { TaskStateIconComponent } from './components/task-state-icon/task-state-icon.component';
import { TitleComponent } from './components/title/title.component';
import { MaterialModule } from './material.module';
import { ApiClientService } from './services/api-client/api-client.service';
import { AuthService } from './services/auth/auth.service';
import { DateUtilsService } from './services/date-utils/date-utils.service';
import { TaskCreatorService } from './services/task-creator/task-creator.service';
import { TaskStateTranslatorService } from './services/task-state-translator/task-state-translator.service';
import { TasksService } from './services/tasks/tasks.service';
import { UserService } from './services/user/user.service';
import { ZipTasksService } from './services/zip-tasks/zip-tasks.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [TaskStateIconComponent, TitleComponent, EmptyInfoBoxComponent, SubtitleComponent],
  imports: [
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
  providers: [
    ApiClientService,
    AuthService,
    DateUtilsService,
    TaskCreatorService,
    TaskStateTranslatorService,
    TasksService,
    UserService,
    ZipTasksService,
  ],
  exports: [EmptyInfoBoxComponent, TaskStateIconComponent, TitleComponent, SubtitleComponent],
})
export class SharedModule {}
