import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';
import { LabelModule } from '../label/label.module';
import { ParagraphModule } from '../paragraph/paragraph.module';
import { TaskStateIconModule } from '../task-state-icon/task-state-icon.module';
import { TitleModule } from '../title/title.module';
import { TaskCardComponent } from './task-card.component';

@NgModule({
  declarations: [TaskCardComponent],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CommonModule,
    MatButtonModule,
    TaskStateIconModule,
    MatIconModule,
    TitleModule,
    LabelModule,
    ParagraphModule,
    MatTooltipModule,
  ],
  providers: [DateUtilsService],
  exports: [TaskCardComponent],
})
export class TaskCardModule {}
