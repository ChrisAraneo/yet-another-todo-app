import { Component, EventEmitter, Input, Output } from '@angular/core';
import { COLOR_PRIMARY_50 } from 'src/app/shared/styles/theme.__generated';

@Component({
  selector: 'yata-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
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
