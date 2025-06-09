import { Component } from '@angular/core';

import { TitleComponent } from '../../../shared/components/title/title.component';

@Component({
  selector: 'yata-modal-title',
  templateUrl: './modal-title.component.html',
  styleUrl: './modal-title.component.scss',
  standalone: true,
  imports: [TitleComponent],
})
export class ModalTitleComponent {}
