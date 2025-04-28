import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

import { LabelComponent } from '../../../../shared/components/label/label.component';

@Component({
  selector: 'yata-offline-indicator',
  templateUrl: './offline-indicator.component.html',
  styleUrls: ['./offline-indicator.component.scss'],
  standalone: true,
  imports: [LabelComponent, MatIcon, TranslatePipe, MatTooltip],
})
export class OfflineIndicatorComponent {}
