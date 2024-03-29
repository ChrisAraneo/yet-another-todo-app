import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss'],
})
export class AppWrapperComponent {
  @Input() isAppVisible: boolean = true;
}
