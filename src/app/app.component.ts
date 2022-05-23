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
  title = '';
  tasks: Task[] = [];
  subscription: Subscription = new Subscription();

  constructor(private es: ElectronService, private tasksService: TasksService) {}

  ngOnInit() {
    this.es.isElectronApp ? (this.title = 'Electron Application') : (this.title = 'Standard Angular Web Application');

    this.subscription = this.tasksService.getTasksStream().subscribe((newState: Task[]) => {
      this.tasks = newState;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
