import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { TaskStateIconComponent } from './task-state-icon.component';

@NgModule({
  declarations: [TaskStateIconComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  exports: [TaskStateIconComponent],
})
export class TaskStateIconModule {}
