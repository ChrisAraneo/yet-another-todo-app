import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { LabelComponent } from '../../../../shared/components/label/label.component';

@Component({
  selector: 'yata-logged-user-information',
  templateUrl: './logged-user-information.component.html',
  styleUrls: ['./logged-user-information.component.scss'],
  standalone: true,
  imports: [LabelComponent, TranslatePipe],
})
export class LoggedUserInformationComponent {
  @Input() username: string | null = null;
}
