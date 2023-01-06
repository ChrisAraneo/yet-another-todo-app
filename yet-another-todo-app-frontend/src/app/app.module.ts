import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TaskStateIconComponent } from './components/task-state-icon/task-state-icon.component';
import { TaskCardComponent } from './components/timeline/task-card/task-card.component';
import { TimelineContentComponent } from './components/timeline/timeline-content/timeline-content.component';
import { TimelineHeaderComponent } from './components/timeline/timeline-header/timeline-header.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { DateUtilsService } from './services/date-utils.service';

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
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DateUtilsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
