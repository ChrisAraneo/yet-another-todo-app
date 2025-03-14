import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '../forms/forms.module';
import { TaskCardModule } from '../shared/components/task-card/task-card.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { ColumnHighlightComponent } from './components/timeline/column-highlight/column-highlight.component';
import { TimelineContentComponent } from './components/timeline/timeline-content/timeline-content.component';
import { TimelineHeaderComponent } from './components/timeline/timeline-header/timeline-header.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineTaskManagerService } from './services/timeline-task-manager.service';

@NgModule({
  declarations: [
    TimelineContentComponent,
    TimelineHeaderComponent,
    TimelineComponent,
    ColumnHighlightComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
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
    MaterialModule,
    AngularFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
    TaskCardModule,
  ],
  providers: [TimelineTaskManagerService],
  exports: [TimelineComponent],
})
export class TimelineModule {}
