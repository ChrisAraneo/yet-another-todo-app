import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'yata-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    standalone: false
})
export class ImageComponent implements AfterViewInit {
  @Input({ required: true }) src: string = '';
  @Input({ required: true }) width: number = 0;
  @Input({ required: true }) height: number = 0;
  @Input({ required: true }) alt: string = '';
  @Input() maxWidth?: number;
  @Input() maxHeight?: number;

  @ViewChild('image') imageRef?: ElementRef;

  protected isLoading: boolean = true;

  ngAfterViewInit(): void {
    const nativeImageElement: HTMLImageElement | undefined = this.imageRef?.nativeElement;

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
