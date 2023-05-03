import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-empty-info-box',
  templateUrl: './empty-info-box.component.html',
  styleUrls: ['./empty-info-box.component.scss'],
})
export class EmptyInfoBoxComponent {
  @Input() caption: string = '';
  @Input() hint: string = '';
}
