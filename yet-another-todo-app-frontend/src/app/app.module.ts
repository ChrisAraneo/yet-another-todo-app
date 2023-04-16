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
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { DatesFilterComponent } from './components/timeline/dates-filter/dates-filter.component';
import { TaskCardComponent } from './components/timeline/task-card/task-card.component';
import { TimelineContentComponent } from './components/timeline/timeline-content/timeline-content.component';
import { TimelineHeaderComponent } from './components/timeline/timeline-header/timeline-header.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterModule } from './footer/footer.module';
import { FormsModule } from './forms/forms.module';
import { ModalsModule } from './modals/modals.module';
import { DialogService } from './modals/services/dialog/dialog.service';
import { TokenInterceptor } from './shared/interceptors/token/token.interceptor';
import { MaterialModule } from './shared/material.module';
import { ApiClientService } from './shared/services/api-client/api-client.service';
import { AuthService } from './shared/services/auth/auth.service';
import { DateUtilsService } from './shared/services/date-utils/date-utils.service';
import { TaskCreatorService } from './shared/services/task-creator/task-creator.service';
import { TaskStateTranslatorService } from './shared/services/task-state-translator/task-state-translator.service';
import { TasksService } from './shared/services/tasks/tasks.service';
import { UserService } from './shared/services/user/user.service';
import { SharedModule } from './shared/shared.module';
import { TaskEffects } from './shared/store/effects/task.effects';
import { tasksReducer } from './shared/store/reducers/task.reducer';
import { userReducer } from './shared/store/reducers/user.reducer';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { TableModule } from './table/table.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TimelineComponent,
    TimelineHeaderComponent,
    AppWrapperComponent,
    TaskCardComponent,
    TimelineContentComponent,
    DatesFilterComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ModalsModule,
    SideNavigationModule,
    TableModule,
    FooterModule,
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
