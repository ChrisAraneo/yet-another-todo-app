import { Component, Input } from '@angular/core';

import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  selector: 'yata-readonly',
  standalone: true,
  imports: [FormLabelComponent],
  templateUrl: './readonly.component.html',
  styleUrl: './readonly.component.scss',
})
export class ReadonlyComponent {
  @Input() label = '';
  @Input() value?: string | null = '';
}
