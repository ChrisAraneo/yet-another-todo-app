import { NgOptimizedImage, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'yata-image',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements AfterViewInit, OnChanges {
  @Input({
    required: true,
  })
  src = '';
  @Input({
    required: true,
  })
  width = 0;
  @Input({
    required: true,
  })
  height = 0;
  @Input({
    required: true,
  })
  alt = '';
  @Input() maxWidth?: number;
  @Input() maxHeight?: number;

  @ViewChild('image')
  imageRef?: ElementRef;

  protected isLoading = true;
  protected style = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxWidth'] || changes['maxHeight']) {
      this.style = {
        width: this.maxWidth ? `${this.maxWidth}px` : '100%',
        height: this.maxHeight ? `${this.maxHeight}px` : '100%',
      };
    }
  }

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
