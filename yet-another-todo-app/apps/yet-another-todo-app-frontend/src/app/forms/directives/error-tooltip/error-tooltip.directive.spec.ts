import { TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { ErrorTooltipDirective } from './error-tooltip.directive';

describe('ErrorTooltipDirective', () => {
  it('should create an instance', () => {
    const directive = new ErrorTooltipDirective(
      MockService(TemplateRef),
      MockService(ViewContainerRef),
      MockService(NgControl),
    );
    expect(directive).toBeTruthy();
  });
});
