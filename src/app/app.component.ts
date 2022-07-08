import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from 'ngx-electron';
import { Subscription } from 'rxjs';
import { TasksService } from './services/tasks.service';
import { TaskState } from './shared/model/task-state.enum';
import { Task } from './shared/model/task.type';

@Component({
  selector: 'yata-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Yet Another Todo App';
  allTasks: Task[] = [];
  selectedDate: Date | null = new Date();
  selectedTasks: Task[] = [];
  subscription: Subscription = new Subscription();

  constructor(private es: ElectronService, private tasksService: TasksService, translate: TranslateService) {
    const langs = ['en', 'pl'];
    translate.addLangs(langs);
    translate.setDefaultLang(langs[0]);

    const browserLang = translate.getBrowserLang() || '';
    const regex = `${langs.join('|')}`;
    translate.use(browserLang.match(regex) ? browserLang : langs[0]);
  }

  ngOnInit() {
    // this.es.isElectronApp ? (this.title = 'Electron Application') : (this.title = 'Standard Angular Web Application');

    this.subscription = this.tasksService.getTasksStream().subscribe((newState: Task[]) => {
      this.allTasks = newState;
      this.selectedTasks = this.filterTasks(newState, this.selectedDate);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeSelectedDate(date: Date | null): void {
    this.selectedDate = date;
    this.selectedTasks = this.filterTasks(this.allTasks, this.selectedDate);
  }

  private filterTasks(tasks: Task[], selectedDate: Date | null): Task[] {
    if (selectedDate === null) {
      return [];
    }

    const selectedDateString = selectedDate.toDateString();

    return tasks.filter(({ state, creationDate, startDate, endDate }) => {
      const creationDateString = creationDate.toDateString();
      const startDateString = startDate ? startDate.toDateString() : '';
      const endDateString = endDate ? endDate.toDateString() : '';
      const wasCreatedToday = creationDateString === selectedDateString;
      const wasCreatedInThePast = creationDate.valueOf() <= selectedDate.valueOf();
      const hasStartedToday = startDateString === selectedDateString;
      const hasStartedInThePast = startDate ? startDate.valueOf() <= selectedDate.valueOf() : false;
      const hasEndedToday = endDateString === selectedDateString;
      const hasEndedLater = endDate ? endDate.valueOf() > selectedDate.valueOf() : false;

      if (state === TaskState.NotStarted) {
        return wasCreatedToday || wasCreatedInThePast;
      } else if (state === TaskState.InProgress || state === TaskState.Suspended) {
        return hasStartedToday || hasStartedInThePast;
      } else if (state === TaskState.Finished || state === TaskState.Rejected) {
        return (hasStartedToday || hasStartedInThePast) && (hasEndedToday || hasEndedLater);
      } else {
        return false;
      }
    });
  }
}
