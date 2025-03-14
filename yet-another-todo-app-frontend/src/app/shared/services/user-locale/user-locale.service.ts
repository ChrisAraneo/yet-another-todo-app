import { Injectable } from '@angular/core';
import { enGB, Locale, pl } from 'date-fns/locale';
import { NavigatorRefService } from '../navigator-ref/navigator-ref.service';

@Injectable({
  providedIn: 'root',
})
export class UserLocaleService {
  constructor(private navigatorRefService: NavigatorRefService) {}

  get(): Locale {
    const defaultValue = enGB;
    const navigator = this.navigatorRefService.get();

    if (!navigator) {
      return defaultValue;
    }

    const localization: string =
      navigator.language ||
      (navigator.languages ? navigator.languages[0] : defaultValue) ||
      (navigator as any)['browserLanguage'] ||
      (navigator as any)['userLanguage'];

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
