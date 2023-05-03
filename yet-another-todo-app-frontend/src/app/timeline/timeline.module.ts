import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '../forms/forms.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { DatesFilterComponent } from './components/timeline/dates-filter/dates-filter.component';
import { TaskCardComponent } from './components/timeline/task-card/task-card.component';
import { TimelineContentComponent } from './components/timeline/timeline-content/timeline-content.component';
import { TimelineHeaderComponent } from './components/timeline/timeline-header/timeline-header.component';
import { TimelineComponent } from './components/timeline/timeline.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    DatesFilterComponent,
    TaskCardComponent,
    TimelineContentComponent,
    TimelineHeaderComponent,
    TimelineComponent,
  ],
  imports: [
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
  ],
  providers: [],
  exports: [TimelineComponent],
})
export class TimelineModule {}
