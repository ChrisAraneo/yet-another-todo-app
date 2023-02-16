import { Component, OnDestroy } from '@angular/core';
import { AppMode } from './app.types';
import { DateUtilsService } from './services/date-utils/date-utils.service';
import { TasksService } from './services/tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  readonly timelineMode = AppMode.Timeline;
  readonly tableMode = AppMode.Table;

  title: string = 'ヤタ YATA - Yet Another Todo App';
  isMenuOpened: boolean = true;
  timelineStartDate!: Date;
  timelineEndDate!: Date;
  appMode: AppMode = AppMode.Timeline;

  constructor(private taskService: TasksService, private dateUtilsService: DateUtilsService) {
    this.initializeTimelineStartDate();
    this.initializeTimelineEndDate();
  }

  ngOnDestroy(): void {
    this.taskService.unsubscribe();
  }

  onMenuClick(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  changeAppMode(mode: AppMode): void {
    this.appMode = mode;
  }

  changeStartAndEndDate(startDate: Date): void {
    this.timelineStartDate = startDate;
    this.timelineEndDate = this.dateUtilsService.getLastDayOfTheMonth(startDate);
  }

  private initializeTimelineStartDate() {
    const today = new Date();

    this.timelineStartDate = this.dateUtilsService.getFirstDayOfTheMonth(today);
  }

  private initializeTimelineEndDate() {
    const today = new Date();

    this.timelineEndDate = this.dateUtilsService.getFirstDayOfTheMonth(today);
  }
}
