import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yata-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() color: string = '';
  @Input() textAlign: string = '';

  style!: object;

  ngOnInit(): void {
    this.style = {
      color: this.color || null,
      'text-align': this.textAlign || null,
    };
  }
}
