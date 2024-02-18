import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
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
import { ConfigureTableModalComponent } from './components/configure-table-modal/configure-table-modal.component';
import { ConfigureTimelineModalComponent } from './components/configure-timeline-modal/configure-timeline-modal.component';
import { DragDropTaskOrderListComponent } from './components/configure-timeline-modal/drag-drop-task-order-list/drag-drop-task-order-list.component';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { ExportTasksModalComponent } from './components/export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from './components/import-tasks-modal/import-tasks-modal.component';
import { SelectImportActionModalComponent } from './components/import-tasks-modal/select-import-action-modal/select-import-action-modal.component';
import { ModalActionButtonsComponent } from './components/modal-action-buttons/modal-action-buttons.component';
import { ModalLauncherComponent } from './components/modal-launcher/modal-launcher.component';
import { ModalTitleComponent } from './components/modal-title/modal-title.component';
import { PageComponent } from './components/page/page.component';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { DialogService } from './services/dialog/dialog.service';

@NgModule({
  declarations: [
    ModalTitleComponent,
    ModalActionButtonsComponent,
    AddTaskModalComponent,
    DeleteTaskModalComponent,
    EditTaskModalComponent,
    SignInModalComponent,
    ExportTasksModalComponent,
    ImportTasksModalComponent,
    SelectImportActionModalComponent,
    DragDropTaskOrderListComponent,
    ConfigureTimelineModalComponent,
    ConfigureTableModalComponent,
    ModalLauncherComponent,
    PageComponent,
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
  exports: [ModalLauncherComponent],
})
export class ModalsModule {}
