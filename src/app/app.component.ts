import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { TaskState } from './shared/model/task-state.type';
import { Task } from './shared/model/task.type';

@Component({
  selector: 'yata-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular 12 Electron Webpack5 Demo';
  example: Task[] = [
    {
      id: '1',
      title: 'Example task',
      startDate: new Date(),
      state: TaskState.NotStarted,
    },
    {
      id: '2',
      title: 'Example task 2',
      startDate: new Date(),
      state: TaskState.InProgress,
    },
    {
      id: '3',
      title: 'Example task 3',
      startDate: new Date(),
      state: TaskState.Finished,
    },
    {
      id: '4',
      title: 'Example task 4',
      startDate: new Date(),
      state: TaskState.Suspended,
    },
    {
      id: '5',
      title: 'Example task 5',
      startDate: new Date(),
      state: TaskState.Rejected,
    },
  ];

  constructor(private es: ElectronService) {}

  ngOnInit() {
    this.es.isElectronApp
      ? (this.title = 'Electron Application')
      : (this.title = 'Standard Angular Web Application');
  }
}
