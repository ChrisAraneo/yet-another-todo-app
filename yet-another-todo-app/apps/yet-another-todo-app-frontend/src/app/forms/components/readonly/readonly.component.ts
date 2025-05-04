import { Component, Input } from '@angular/core';

import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
    selector: 'yata-readonly',
    templateUrl: './readonly.component.html',
    styleUrls: ['./readonly.component.scss'],
    standalone: true,
    imports: [FormLabelComponent]
})
export class ReadonlyComponent {
  @Input() label = '';
  @Input() value?: string | null = '';
}
