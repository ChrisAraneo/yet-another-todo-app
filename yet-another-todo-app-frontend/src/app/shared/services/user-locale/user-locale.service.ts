import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { enGB, pl } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class UserLocaleService {
  private window: Window | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  get(): Locale {
    const defaultValue = enGB;

    if (!this.window || typeof this.window.navigator === 'undefined') {
      return defaultValue;
    }

    const navigator = this.window.navigator as any;
    const localization =
      (navigator.languages ? navigator.languages[0] : defaultValue) ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage;

    const resolvedLanguage = localization.split('-')[0];

    switch (resolvedLanguage) {
      case 'en':
        return enGB;
      case 'pl':
        return pl;
      default:
        console.error(`Application doesn't support users locale: ${resolvedLanguage}`);

        return defaultValue;
    }
  }
}
