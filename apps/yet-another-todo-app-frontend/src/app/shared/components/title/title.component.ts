import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yata-title',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent implements OnInit {
  @Input() color = '';
  @Input() textAlign = '';

  style!: object;

  ngOnInit(): void {
    this.style = {
      color: this.color || null,
      'text-align': this.textAlign || null,
    };
  }
}
