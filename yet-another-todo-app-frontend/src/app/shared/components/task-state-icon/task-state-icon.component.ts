import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskState } from '../../../../../../yet-another-todo-app-shared';

@Component({
    selector: 'yata-task-state-icon',
    templateUrl: './task-state-icon.component.html',
    styleUrls: ['./task-state-icon.component.scss'],
    standalone: false
})
export class TaskStateIconComponent implements OnChanges {
  @Input() state!: TaskState;
  @Input() size: number = 22;
  @Input() opacity: number = 1.0;

  iconName?: string;
  style?: { [cssProperty: string]: any };
  value?: string;

  ngOnChanges(changes: SimpleChanges): void {
    const currentState = changes['state'] && changes['state'].currentValue;
    const previousState = changes['state'] && changes['state'].previousValue;
    const currentSize = changes['size'] && changes['size'].currentValue;
    const previousSize = changes['size'] && changes['size'].previousValue;
    const currentOpacity = changes['opacity'] && changes['opacity'].currentValue;
    const previousOpacity = changes['opacity'] && changes['opacity'].previousValue;

    if (currentState !== previousState) {
      this.updateIconName(currentState);
      this.updateTaskStateValue(currentState);
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
    this.iconName = state.getRelatedIconName();
  }

  private updateStyle(state: TaskState, size: number, opacity: number): void {
    const sizeInPx = size + 'px';
    const color = state.getRelatedColor();

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

  private updateTaskStateValue(state: TaskState): void {
    this.value = state.toString();
  }
}
