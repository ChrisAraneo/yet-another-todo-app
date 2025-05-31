import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-form-label',
  templateUrl: './form-label.component.html',
  styleUrl: './form-label.component.scss',
  standalone: true,
})
export class FormLabelComponent {
  @Input() for = '';
}
