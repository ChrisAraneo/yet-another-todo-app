import { Component, OnDestroy } from '@angular/core';
import { debounceTime, filter, Subscription } from 'rxjs';
import { AppMode } from './app.types';
import { DateUtilsService } from './services/date-utils/date-utils.service';
import { DialogService } from './services/dialog/dialog.service';
import { TasksService } from './services/tasks/tasks.service';
import { UserService } from './services/user/user.service';

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

  private subscription!: Subscription;

  constructor(
    private taskService: TasksService,
    private dateUtilsService: DateUtilsService,
    private userService: UserService,
    private dialogService: DialogService,
  ) {
    this.initializeTimelineStartDate();
    this.initializeTimelineEndDate();
    this.subscribeToUserChanges();
  }

  ngOnDestroy(): void {
    this.taskService.unsubscribe();
    this.subscription && this.subscription.unsubscribe();
  }

  onMenuClick(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  changeAppMode(mode: AppMode): void {
    this.appMode = mode;
  }

  changeStartDate(startDate: Date): void {
    this.timelineStartDate = startDate;
  }

  changeEndDate(endDate: Date): void {
    this.timelineEndDate = endDate;
  }

  private initializeTimelineStartDate(): void {
    const today = new Date();

    this.timelineStartDate = this.dateUtilsService.getFirstDayOfTheMonth(today);
  }

  private initializeTimelineEndDate(): void {
    const today = new Date();

    this.timelineEndDate = this.dateUtilsService.getLastDayOfTheMonth(today);
  }

  private subscribeToUserChanges(): void {
    this.subscription = this.userService
      .getIsUserLogged()
      .pipe(
        debounceTime(2000),
        filter((isLogged) => !isLogged),
      )
      .subscribe(() => {
        this.dialogService.openSignInModal();
      });
  }
}
