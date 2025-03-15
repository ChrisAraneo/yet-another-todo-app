import { Component, Input } from '@angular/core';

@Component({
    selector: 'yata-form-label',
    templateUrl: './form-label.component.html',
    styleUrls: ['./form-label.component.scss'],
    standalone: false
})
export class FormLabelComponent {
  @Input() for: string = '';
}
