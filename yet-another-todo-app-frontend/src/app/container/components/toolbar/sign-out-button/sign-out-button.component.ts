import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'yata-sign-out-button',
    templateUrl: './sign-out-button.component.html',
    styleUrls: ['./sign-out-button.component.scss'],
    standalone: false
})
export class SignOutButtonComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  reloadPage(): void {
    const window = this.document.defaultView;

    // TODO This is non Angular way to reload whole page/app, find better solution
    window?.location.replace('/');
  }
}
