import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageComponent } from './image.component';

@NgModule({
  declarations: [ImageComponent],
  imports: [CommonModule, NgOptimizedImage],
  providers: [],
  exports: [ImageComponent],
})
export class ImageModule {}
