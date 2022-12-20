import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() headers: string[] = [];

  constructor() {}
}
