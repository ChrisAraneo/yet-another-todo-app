import { NgOptimizedImage, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'yata-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  standalone: true,
  imports: [NgStyle, NgOptimizedImage],
})
export class ImageComponent implements AfterViewInit {
  @Input({ required: true }) src = '';
  @Input({ required: true }) width = 0;
  @Input({ required: true }) height = 0;
  @Input({ required: true }) alt = '';
  @Input() maxWidth?: number;
  @Input() maxHeight?: number;

  @ViewChild('image') imageRef?: ElementRef;

  protected isLoading = true;

  ngAfterViewInit(): void {
    const nativeImageElement: HTMLImageElement | undefined =
      this.imageRef?.nativeElement;

    if (nativeImageElement) {
      nativeImageElement.addEventListener('load', () => {
        this.isLoading = false;
      });
      nativeImageElement.addEventListener('error', (error: ErrorEvent) => {
        throw error;
      });
    }
  }
}
