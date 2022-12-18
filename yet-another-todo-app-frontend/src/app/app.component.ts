import { Component, OnInit } from '@angular/core';
import { DateUtilsService } from './services/date-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'ヤタ YATA - Yet Another Todo App';
  isMenuOpened: boolean = true;
  timelineHeaders: string[] = [];

  constructor(private dateUtils: DateUtilsService) {}

  ngOnInit(): void {
    const today = new Date();
    this.timelineHeaders = this.dateUtils
      .getAllDaysInMonth(today)
      .map((date) => this.dateUtils.formatDate(date, 'dd-MM-yyyy'));
  }

  onMenuClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
