import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-logged-user-information',
  templateUrl: './logged-user-information.component.html',
  styleUrls: ['./logged-user-information.component.scss'],
})
export class LoggedUserInformationComponent {
  @Input() username: string | null = null;
}
