import { Component, Input } from '@angular/core';

@Component({
    selector: 'yata-readonly',
    templateUrl: './readonly.component.html',
    styleUrls: ['./readonly.component.scss'],
    standalone: false
})
export class ReadonlyComponent {
  @Input() label: string = '';
  @Input() value?: string | null = '';
}
