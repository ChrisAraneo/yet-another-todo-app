import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { EndedTask, StartedTask } from '../../../../../../yet-another-todo-app-shared';
import { TasksDataSource } from '../../table.types';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';

@Component({
  selector: 'yata-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss'],
})
export class NewTableComponent implements OnInit {
  readonly TITLE_MAX_LENGTH = 25;
  readonly DESCRIPTION_MAX_LENGTH = 75;

  data!: Observable<TasksDataSource[]>;

  constructor(
    private readonly tasksService: TasksService,
    private readonly dateUtilsService: DateUtilsService,
  ) {}

  ngOnInit(): void {
    this.data = this.tasksService.getTasks().pipe(
      map((tasks) => {
        return tasks.map((item) => ({
          id: item.getId(),
          shortId: item.getShortId(),
          title: item.getTitle(),
          description: item.getDescription(),
          state: item.getState(),
          creationDate: this.formatDate(item.getCreationDate()),
          startDate: item instanceof StartedTask ? this.formatDate(item.getStartDate()) : '-',
          endDate: item instanceof EndedTask ? this.formatDate(item.getEndDate()) : '-',
        }));
      }),
    );
  }

  private formatDate(date: Date): string {
    return this.dateUtilsService.formatDate(date, 'dd-MM-yyyy HH:mm');
  }
}
