import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'YATA';
  isMenuOpened: boolean = true;

  onMenuClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
