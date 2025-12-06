import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { LabelComponent } from '../../../../shared/components/label/label.component';

@Component({
  selector: 'yata-logged-user-information',
  standalone: true,
  imports: [LabelComponent, TranslatePipe],
  templateUrl: './logged-user-information.component.html',
  styleUrl: './logged-user-information.component.scss',
})
export class LoggedUserInformationComponent {
  @Input() username: string | null = null;
}
