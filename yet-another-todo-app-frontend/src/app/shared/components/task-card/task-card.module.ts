import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParagraphModule } from '../paragraph/paragraph.module';
import { TaskStateIconModule } from '../task-state-icon/task-state-icon.module';
import { TitleModule } from '../title/title.module';
import { TaskCardComponent } from './task-card.component';

@NgModule({
  declarations: [TaskCardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TaskStateIconModule,
    MatIconModule,
    TitleModule,
    ParagraphModule,
  ],
  providers: [],
  exports: [TaskCardComponent],
})
export class TaskCardModule {}
