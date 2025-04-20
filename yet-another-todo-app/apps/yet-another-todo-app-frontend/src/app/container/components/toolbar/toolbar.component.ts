import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { COLOR_PRIMARY_50 } from '@chris.araneo/yet-another-todo-app-shared/src/styles/theme.__generated';
import { TranslatePipe } from '@ngx-translate/core';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';
import { LoggedUserInformationComponent } from './logged-user-information/logged-user-information.component';
import { ToolbarModule } from 'primeng/toolbar';
import { OfflineIndicatorComponent } from './offline-indicator/offline-indicator.component';

@Component({
  selector: 'yata-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
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
  @Input() title: string = '';
  @Input() username: string | null = null;
  @Input() isOfflineMode: boolean = false;

  @Output() menuClick = new EventEmitter();

  readonly titleColor = COLOR_PRIMARY_50;

  onMenuClick(): void {
    this.menuClick.emit();
  }
}
