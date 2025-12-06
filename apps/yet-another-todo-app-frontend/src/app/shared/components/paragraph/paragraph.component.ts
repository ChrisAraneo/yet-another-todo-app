import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-paragraph',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.scss',
})
export class ParagraphComponent {
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';
}
