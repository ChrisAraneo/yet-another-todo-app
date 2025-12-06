import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'yata-logo',
  standalone: true,
  imports: [ImageComponent, TranslatePipe],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {}
