import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxElectronModule } from 'ngx-electron';
import { MaterialModule } from 'src/material.module';
import { AppComponent } from './app.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskStateIconComponent } from './components/task-state-icon/task-state-icon.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TasksService } from './services/tasks.service';
import { tasksReducer } from './store/task.reducer';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent, ToolbarComponent, TaskCardComponent, DatePickerComponent, TaskStateIconComponent],
  imports: [
    StoreModule.forRoot({ tasks: tasksReducer }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxElectronModule,
    FlexLayoutModule,
  ],
  providers: [TasksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
