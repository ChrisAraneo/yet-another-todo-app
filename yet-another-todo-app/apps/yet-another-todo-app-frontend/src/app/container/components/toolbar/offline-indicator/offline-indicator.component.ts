import { Component } from '@angular/core';
import { LabelComponent } from '../../../../shared/components/label/label.component';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'yata-offline-indicator',
  templateUrl: './offline-indicator.component.html',
  styleUrls: ['./offline-indicator.component.scss'],
  standalone: true,
  imports: [LabelComponent, MatIcon, TranslatePipe, MatTooltip],
})
export class OfflineIndicatorComponent {}
