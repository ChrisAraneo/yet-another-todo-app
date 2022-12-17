import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'ヤタ YATA - Yet Another Todo App';
  isMenuOpened: boolean = true;
  timelineHeaders: string[] = [];

  ngOnInit(): void {
    this.timelineHeaders = [
      '17.12.2022',
      '18.12.2022',
      '19.12.2022',
      '20.12.2022',
    ];
  }

  onMenuClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
