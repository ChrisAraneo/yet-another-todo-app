import { Component, OnDestroy } from '@angular/core';
import { AppMode } from './app.types';
import { TasksService } from './services/tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title: string = 'ヤタ YATA - Yet Another Todo App';
  isMenuOpened: boolean = true;
  timelineStartDate: Date = new Date(2022, 12, 1);
  timelineEndDate: Date = new Date(2022, 12, 31);
  appMode: AppMode = AppMode.Timeline;

  constructor(private taskService: TasksService) {}

  ngOnDestroy(): void {
    this.taskService.unsubscribe();
  }

  onMenuClick(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  onChangeAppMode(mode: AppMode): void {
    this.appMode = mode;
  }
}
