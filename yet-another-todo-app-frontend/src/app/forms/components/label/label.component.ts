import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
  @Input() for: string = '';
}
