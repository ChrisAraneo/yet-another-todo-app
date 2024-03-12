import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TitleComponent } from './title.component';

@NgModule({
  declarations: [TitleComponent],
  imports: [CommonModule],
  providers: [],
  exports: [TitleComponent],
})
export class TitleModule {}
