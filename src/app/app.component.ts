import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subscription } from 'rxjs';
import { TasksService } from './services/tasks.service';
import { Task } from './shared/model/task.type';

@Component({
  selector: 'yata-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Yet Another Todo App';
  allTasks: Task[] = [];
  selectedDate: Date = new Date();
  selectedTasks: Task[] = [];
  subscription: Subscription = new Subscription();

  constructor(private es: ElectronService, private tasksService: TasksService) {}

  ngOnInit() {
    // this.es.isElectronApp ? (this.title = 'Electron Application') : (this.title = 'Standard Angular Web Application');

    this.subscription = this.tasksService.getTasksStream().subscribe((newState: Task[]) => {
      this.allTasks = newState;
      this.selectedTasks = this.filterTasksStartedOnDate(newState, this.selectedDate);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private filterTasksStartedOnDate(tasks: Task[], date: Date): Task[] {
    return tasks.filter(({ startDate, endDate }) => {
      const todayMidnight: number = this.getLastUTCMidnightDate(date);
      const tommorowMidnight: number = this.getNextUTCMidnightDate(date);

      return startDate.getTime() > todayMidnight && (endDate === undefined || endDate.getTime() < tommorowMidnight);
    });
  }

  private getLastUTCMidnightDate(date: Date): number {
    return new Date(new Date(new Date(date.setUTCHours(0)).setUTCMinutes(0)).setUTCSeconds(0)).setUTCMilliseconds(0);
  }

  private getNextUTCMidnightDate(date: Date): number {
    return new Date(new Date(this.getLastUTCMidnightDate(date)).getDate() + 1).getTime();
  }
}
