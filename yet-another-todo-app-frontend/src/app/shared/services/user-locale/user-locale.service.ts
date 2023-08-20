import { Injectable } from '@angular/core';
import { enGB, pl } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class UserLocaleService {
  get(): Locale {
    const defaultValue = enGB;

    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }

    const navigator = window.navigator as any;
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
