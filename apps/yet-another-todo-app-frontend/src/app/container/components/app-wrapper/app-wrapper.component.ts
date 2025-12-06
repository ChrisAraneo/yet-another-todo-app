import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-app-wrapper',
  standalone: true,
  templateUrl: './app-wrapper.component.html',
  styleUrl: './app-wrapper.component.scss',
})
export class AppWrapperComponent {
  @Input() isAppVisible = true;
}
