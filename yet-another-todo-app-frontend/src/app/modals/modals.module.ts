import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '../forms/forms.module';
import { MaterialModule } from '../shared/material.module';
import { ApiClientService } from '../shared/services/api-client/api-client.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { DateUtilsService } from '../shared/services/date-utils/date-utils.service';
import { TaskCreatorService } from '../shared/services/task-creator/task-creator.service';
import { TaskStateTranslatorService } from '../shared/services/task-state-translator/task-state-translator.service';
import { TasksService } from '../shared/services/tasks/tasks.service';
import { UserService } from '../shared/services/user/user.service';
import { SharedModule } from '../shared/shared.module';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { ConfigureTimelineModalComponent } from './components/configure-timeline-modal/configure-timeline-modal.component';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { ExportTasksModalComponent } from './components/export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from './components/import-tasks-modal/import-tasks-modal.component';
import { SelectImportActionModalComponent } from './components/import-tasks-modal/select-import-action-modal/select-import-action-modal.component';
import { ModalActionButtonsComponent } from './components/modal-action-buttons/modal-action-buttons.component';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { DialogService } from './services/dialog/dialog.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ModalActionButtonsComponent,
    AddTaskModalComponent,
    DeleteTaskModalComponent,
    EditTaskModalComponent,
    SignInModalComponent,
    ExportTasksModalComponent,
    ImportTasksModalComponent,
    SelectImportActionModalComponent,
    ConfigureTimelineModalComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    AngularFormsModule,
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
    MaterialModule,
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
