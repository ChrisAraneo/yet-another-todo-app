import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskState } from 'src/app/shared/model/task-state.enum';
import { Task } from 'src/app/shared/model/task.type';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit, OnChanges {
  @Input() date: Date | null = null;
  @Input() tasks?: Task[] | null;

  displayedColumns: string[] = ['title', 'startDate', 'endDate', 'state', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);
  states = [TaskState.NotStarted, TaskState.InProgress, TaskState.Finished, TaskState.Suspended, TaskState.Rejected];
  isSelectingStateForId: string | null = null;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.updateDataSource(this.tasks ? this.tasks : []);
  }

  ngOnChanges(changes: SimpleChanges): void {
    changes.tasks && this.updateDataSource(changes.tasks.currentValue);
  }

  changeState(newState: TaskState, taskId: string): void {
    this.tasksService.updateTaskState(taskId, newState);
  }

  private updateDataSource(tasks: Task[] = []): void {
    this.dataSource.data = tasks;
  }
}
