import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'ヤタ YATA - Yet Another Todo App';
  isMenuOpened: boolean = true;
  timelineStartDate: Date = new Date(2022, 12, 1);
  timelineEndDate: Date = new Date(2022, 12, 31);

  constructor() {}

  onMenuClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
