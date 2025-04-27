import { Component, Input } from '@angular/core';
import { LabelComponent } from '../../../../shared/components/label/label.component';
import { TranslatePipe } from '@ngx-translate/core';

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
