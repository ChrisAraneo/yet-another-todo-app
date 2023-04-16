import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { AddTaskModalComponent } from './components/modals/add-task-modal/add-task-modal.component';
import { DeleteTaskModalComponent } from './components/modals/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from './components/modals/edit-task-modal/edit-task-modal.component';
import { SignInModalComponent } from './components/modals/sign-in-modal/sign-in-modal.component';
import { NavigationItemComponent } from './components/side-navigation/navigation-item/navigation-item.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { SearchbarComponent } from './components/table/searchbar/searchbar.component';
import { TableComponent } from './components/table/table.component';
import { DatesFilterComponent } from './components/timeline/dates-filter/dates-filter.component';
import { TaskCardComponent } from './components/timeline/task-card/task-card.component';
import { TimelineContentComponent } from './components/timeline/timeline-content/timeline-content.component';
import { TimelineHeaderComponent } from './components/timeline/timeline-header/timeline-header.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from './forms/forms.module';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { MaterialModule } from './material.module';
import { ApiClientService } from './services/api-client/api-client.service';
import { AuthService } from './services/auth/auth.service';
import { DateUtilsService } from './services/date-utils/date-utils.service';
import { DialogService } from './services/dialog/dialog.service';
import { TaskCreatorService } from './services/task-creator/task-creator.service';
import { TaskStateTranslatorService } from './services/task-state-translator/task-state-translator.service';
import { TasksService } from './services/tasks/tasks.service';
import { UserService } from './services/user/user.service';
import { SharedModule } from './shared/shared.module';
import { TaskEffects } from './store/effects/task.effects';
import { tasksReducer } from './store/reducers/task.reducer';
import { userReducer } from './store/reducers/user.reducer';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

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
    NavigationItemComponent,
    AddTaskModalComponent,
    EditTaskModalComponent,
    AppFooterComponent,
    TableComponent,
    DeleteTaskModalComponent,
    DatesFilterComponent,
    SearchbarComponent,
    SignInModalComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    StoreModule.forRoot({ tasks: tasksReducer, user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TaskEffects]),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFormsModule,
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
    { provide: 'API', useValue: environment.api },
    UserService,
    AuthService,
    TaskStateTranslatorService,
    TaskCreatorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
