import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  standalone: true,
  imports: [NgStyle],
})
export class ParagraphComponent {
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';
}
