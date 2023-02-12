import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'yata-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly pageSizeOptions = [15, 30, 50];
  readonly displayedColumns: string[] = ['id', 'title', 'description'];

  data: MatTableDataSource<Task> | undefined;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.data = new MatTableDataSource<Task>(tasks);
      this.data.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {}
}
