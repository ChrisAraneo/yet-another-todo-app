import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { COLOR_PRIMARY_50 } from '@chris.araneo/yet-another-todo-app-shared/src/styles/theme.__generated';
import { TranslatePipe } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';

import { TitleComponent } from '../../../shared/components/title/title.component';
import { LoggedUserInformationComponent } from './logged-user-information/logged-user-information.component';
import { OfflineIndicatorComponent } from './offline-indicator/offline-indicator.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';

@Component({
  selector: 'yata-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  imports: [
    TranslatePipe,
    MatIcon,
    TitleComponent,
    SignOutButtonComponent,
    LoggedUserInformationComponent,
    ToolbarModule,
    OfflineIndicatorComponent,
  ],
  standalone: true,
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
