import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskState } from 'src/app/models/task-state.enum';

@Component({
  selector: 'yata-task-state-icon',
  templateUrl: './task-state-icon.component.html',
  styleUrls: ['./task-state-icon.component.scss'],
})
export class TaskStateIconComponent implements OnChanges {
  @Input() state!: TaskState;
  @Input() size: number = 22;

  iconName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state'].currentValue !== changes['state'].previousValue) {
      this.iconName = this.mapStateToIconName(changes['state'].currentValue);
    }
  }

  private mapStateToIconName(state: TaskState): string {
    const mapping: Record<TaskState, string> = {
      [TaskState.NotStarted]: 'auto_awesome',
    };

    return mapping[state];
  }
}
