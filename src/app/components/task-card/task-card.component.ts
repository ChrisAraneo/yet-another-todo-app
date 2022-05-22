import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskState } from 'src/app/shared/model/task-state.type';
import { Task } from 'src/app/shared/model/task.type';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit, OnChanges {
  @Input() date: Date | null = null;
  @Input() tasks?: Task[];

  displayedColumns: string[] = ['title', 'startDate', 'endDate', 'state'];
  dataSource = new MatTableDataSource<Task>([]);
  states = [
    TaskState.NotStarted,
    TaskState.InProgress,
    TaskState.Finished,
    TaskState.Suspended,
    TaskState.Rejected,
  ];
  isSelectingStateForId: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.updateDataSource(this.tasks);
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes.tasks && this.updateDataSource(changes.tasks.currentValue);
  }

  setIsSelectingState(taskId: string | null): void {
    this.isSelectingStateForId = taskId;
  }

  changeState(value: TaskState, element: any): void {
    console.log(element);
    this.setIsSelectingState(null);
  }

  hey(event: any) {
    console.log('A', event);
  }

  private updateDataSource(tasks: Task[] = []) {
    this.dataSource.data = tasks;
  }
}
