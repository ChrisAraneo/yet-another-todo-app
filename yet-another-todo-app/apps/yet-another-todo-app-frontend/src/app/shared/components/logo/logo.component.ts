import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'yata-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [ImageComponent, TranslatePipe],
})
export class LogoComponent {}
