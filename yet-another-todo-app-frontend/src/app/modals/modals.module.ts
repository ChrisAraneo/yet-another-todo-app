import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '../forms/forms.module';
import { ApiClientService } from '../shared/services/api-client/api-client.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { DateUtilsService } from '../shared/services/date-utils/date-utils.service';
import { TaskCreatorService } from '../shared/services/task-creator/task-creator.service';
import { TaskStateTranslatorService } from '../shared/services/task-state-translator/task-state-translator.service';
import { TasksService } from '../shared/services/tasks/tasks.service';
import { UserService } from '../shared/services/user/user.service';
import { SharedModule } from '../shared/shared.module';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { DialogService } from './services/dialog/dialog.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AddTaskModalComponent,
    DeleteTaskModalComponent,
    EditTaskModalComponent,
    SignInModalComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DateUtilsService,
    ApiClientService,
    TasksService,
    UserService,
    AuthService,
    TaskStateTranslatorService,
    TaskCreatorService,
    DialogService,
  ],
})
export class ModalsModule {}
