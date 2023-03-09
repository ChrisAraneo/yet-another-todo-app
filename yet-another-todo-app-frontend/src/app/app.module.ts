import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from './components/edit-task-modal/edit-task-modal.component';
import { EmptyInfoBoxComponent } from './components/empty-info-box/empty-info-box.component';
import { DatePickerComponent } from './components/form/date-picker/date-picker.component';
import { SelectComponent } from './components/form/select/select.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import { NavigationItemComponent } from './components/side-navigation/navigation-item/navigation-item.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { SearchbarComponent } from './components/table/searchbar/searchbar.component';
import { TableComponent } from './components/table/table.component';
import { TaskStateIconComponent } from './components/task-state-icon/task-state-icon.component';
import { DatesFilterComponent } from './components/timeline/dates-filter/dates-filter.component';
import { TaskCardComponent } from './components/timeline/task-card/task-card.component';
import { TimelineContentComponent } from './components/timeline/timeline-content/timeline-content.component';
import { TimelineHeaderComponent } from './components/timeline/timeline-header/timeline-header.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TitleComponent } from './components/title/title.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { MaterialModule } from './material.module';
import { ApiClientService } from './services/api-client/api-client.service';
import { DateUtilsService } from './services/date-utils/date-utils.service';
import { DialogService } from './services/dialog/dialog.service';
import { TasksService } from './services/tasks/tasks.service';
import { tasksReducer } from './store/reducers/task.reducer';
import { tokenReducer } from './store/reducers/token.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SideNavigationComponent,
    TimelineComponent,
    TimelineHeaderComponent,
    AppWrapperComponent,
    TaskCardComponent,
    TimelineContentComponent,
    TaskStateIconComponent,
    NavigationItemComponent,
    AddTaskModalComponent,
    TitleComponent,
    EditTaskModalComponent,
    TextInputComponent,
    TextareaComponent,
    SelectComponent,
    DatePickerComponent,
    AppFooterComponent,
    EmptyInfoBoxComponent,
    TableComponent,
    DeleteTaskModalComponent,
    DatesFilterComponent,
    SearchbarComponent,
    SubtitleComponent,
  ],
  imports: [
    StoreModule.forRoot({ tasks: tasksReducer, token: tokenReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    DateUtilsService,
    DialogService,
    ApiClientService,
    TasksService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
