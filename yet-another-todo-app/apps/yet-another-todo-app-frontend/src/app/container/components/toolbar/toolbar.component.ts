import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';

import { TitleComponent } from '../../../shared/components/title/title.component';
import { LoggedUserInformationComponent } from './logged-user-information/logged-user-information.component';
import { OfflineIndicatorComponent } from './offline-indicator/offline-indicator.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';
import { COLOR_PRIMARY_50 } from '../../../shared/styles/theme.__generated';

@Component({
  selector: 'yata-toolbar',
  standalone: true,
  imports: [
    LoggedUserInformationComponent,
    MatIcon,
    OfflineIndicatorComponent,
    SignOutButtonComponent,
    TitleComponent,
    ToolbarModule,
    TranslatePipe,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() title = '';
  @Input() username: string | null = null;
  @Input() isOfflineMode = false;

  @Output() menuClick = new EventEmitter();

  readonly titleColor = COLOR_PRIMARY_50;

  onMenuClick(): void {
    this.menuClick.emit();
  }
}
