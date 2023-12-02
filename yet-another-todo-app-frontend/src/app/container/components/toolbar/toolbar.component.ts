import { Component, EventEmitter, Input, Output } from '@angular/core';

const PALETTE_PRIMARY_100 = '#bec5e6';

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

  readonly titleColor = PALETTE_PRIMARY_100;

  onMenuClick(): void {
    this.menuClick.emit();
  }
}
