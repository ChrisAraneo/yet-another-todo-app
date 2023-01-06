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
  @Input() opacity: number = 1.0;

  iconName?: string;
  style?: { [cssProperty: string]: any };
  label?: string;

  ngOnChanges(changes: SimpleChanges): void {
    const currentState = changes['state'] && changes['state'].currentValue;
    const previousState = changes['state'] && changes['state'].previousValue;
    const currentSize = changes['size'] && changes['size'].currentValue;
    const previousSize = changes['size'] && changes['size'].previousValue;
    const currentOpacity =
      changes['opacity'] && changes['opacity'].currentValue;
    const previousOpacity =
      changes['opacity'] && changes['opacity'].previousValue;

    if (currentState !== previousState) {
      this.updateIconName(currentState);
      this.updateLabel(currentState);
    }

    if (
      currentState !== previousState ||
      currentSize !== previousSize ||
      currentOpacity !== previousOpacity
    ) {
      this.updateStyle(currentState, currentSize, currentOpacity);
    }
  }

  private updateIconName(state: TaskState): void {
    this.iconName = this.mapStateToIconName(state);
  }

  private updateStyle(state: TaskState, size: number, opacity: number): void {
    const sizeInPx = size + 'px';
    const color = this.mapStateToColor(state);

    this.style = {
      width: sizeInPx,
      height: sizeInPx,
      'font-size': sizeInPx,
      'line-height': sizeInPx,
      fill: color,
      color: color,
      opacity: opacity,
    };
  }

  private updateLabel(state: TaskState): void {
    this.label = this.mapStateToLabel(state);
  }

  private mapStateToIconName(state: TaskState): string {
    return ((): Record<TaskState, string> => ({
      [TaskState.NotStarted]: 'auto_awesome',
      [TaskState.InProgress]: 'autorenew',
      [TaskState.Completed]: 'task_alt',
      [TaskState.Rejected]: 'not_interested',
      [TaskState.Suspended]: 'hourglass_empty',
    }))()[state];
  }

  private mapStateToColor(state: TaskState): string {
    return ((): Record<TaskState, string> => ({
      [TaskState.NotStarted]: 'darkgray',
      [TaskState.InProgress]: 'orange',
      [TaskState.Completed]: 'green',
      [TaskState.Rejected]: 'red',
      [TaskState.Suspended]: 'black',
    }))()[state];
  }

  private mapStateToLabel(state: TaskState): string {
    return ((): Record<TaskState, string> => ({
      [TaskState.NotStarted]: 'Task not started',
      [TaskState.InProgress]: 'Task is in progress',
      [TaskState.Completed]: 'Task is completed',
      [TaskState.Rejected]: 'Task rejected',
      [TaskState.Suspended]: 'Task suspended',
    }))()[state];
  }
}
