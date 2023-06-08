import { NgModule } from '@angular/core';
import { ErrorTooltipComponent } from './error-tooltip/components/error-tooltip/error-tooltip.component';
import { ErrorTooltipDirective } from './error-tooltip/error-tooltip.directive';

@NgModule({
  declarations: [ErrorTooltipDirective, ErrorTooltipComponent],
  imports: [],
  providers: [],
  exports: [ErrorTooltipDirective],
})
export class DirectivesModule {}
