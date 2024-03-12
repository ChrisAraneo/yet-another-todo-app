import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParagraphComponent } from './paragraph.component';

@NgModule({
  declarations: [ParagraphComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ParagraphComponent],
})
export class ParagraphModule {}
