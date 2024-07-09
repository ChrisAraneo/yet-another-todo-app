import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { EndedTask, StartedTask } from '../../../../../../yet-another-todo-app-shared';
import { TasksDataSource } from '../../table.types';

@Component({
  selector: 'yata-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss'],
})
export class NewTableComponent implements OnInit {
  data!: Observable<TasksDataSource[]>;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.data = this.tasksService.getTasks().pipe(
      map((tasks) => {
        return tasks.map((item) => ({
          id: item.getId(),
          shortId: item.getShortId(),
          title: item.getTitle(),
          description: item.getDescription(),
          state: item.getState(),
          creationDate: item.getCreationDate().toISOString(),
          startDate: item instanceof StartedTask ? item.getStartDate().toISOString() : '-',
          endDate: item instanceof EndedTask ? item.getEndDate().toISOString() : '-',
        }));
      }),
    );
  }
}
