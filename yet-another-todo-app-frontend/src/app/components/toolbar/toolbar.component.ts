import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'yata-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() title: string = '';

  @Output() menuClick = new EventEmitter();

  constructor() {}

  onMenuClick() {
    this.menuClick.emit();
  }

  onGitClick() {
    window.open('https://github.com/ChrisAraneo/yet-another-todo-app', '_blank');
  }
}
