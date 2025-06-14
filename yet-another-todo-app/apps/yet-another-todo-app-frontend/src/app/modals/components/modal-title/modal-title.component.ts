import { Component } from '@angular/core';

import { TitleComponent } from '../../../shared/components/title/title.component';

@Component({
  selector: 'yata-modal-title',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './modal-title.component.html',
  styleUrl: './modal-title.component.scss',
})
export class ModalTitleComponent {}
