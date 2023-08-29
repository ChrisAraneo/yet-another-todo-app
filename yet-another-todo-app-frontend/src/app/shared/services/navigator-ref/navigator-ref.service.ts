import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigatorRefService {
  private window: Window | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document?.defaultView || null;
  }

  get(): Navigator | null {
    return this.window?.navigator || null;
  }
}
