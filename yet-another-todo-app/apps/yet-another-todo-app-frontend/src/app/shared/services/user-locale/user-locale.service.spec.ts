import { TestBed } from '@angular/core/testing';
import { enGB, pl } from 'date-fns/locale';
import { MockProvider, MockService } from 'ng-mocks';

import { NavigatorRefService as NavigatorReferenceService } from '../navigator-ref/navigator-ref.service';
import { UserLocaleService } from './user-locale.service';

describe('UserLocaleService', () => {
  let service: UserLocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(NavigatorReferenceService, {
          get: () =>
            ({
              language: 'en-GB',
            }) as Navigator,
        }),
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(UserLocaleService);
    TestBed.compileComponents();

    expect(service).toBeTruthy();
  });

  it('#get should return enGB locale by default', () => {
    TestBed.overrideProvider(NavigatorReferenceService, {
      useValue: MockService(NavigatorReferenceService, {
        get: () => null,
      }),
    });
    TestBed.compileComponents();
    service = TestBed.inject(UserLocaleService);

    const lang = service.get();

    expect(lang).toBe(enGB);
  });

  it('#get should return pl locale when browser language is pl-PL', () => {
    TestBed.overrideProvider(NavigatorReferenceService, {
      useValue: MockService(NavigatorReferenceService, {
        get: () =>
          ({
            language: 'pl-PL',
          }) as Navigator,
      }),
    });
    TestBed.compileComponents();
    service = TestBed.inject(UserLocaleService);

    const lang = service.get();

    expect(lang).toBe(pl);
  });

  it('#get should return pl locale when browser language is pl', () => {
    TestBed.overrideProvider(NavigatorReferenceService, {
      useValue: MockService(NavigatorReferenceService, {
        get: () =>
          ({
            language: 'pl',
          }) as Navigator,
      }),
    });
    TestBed.compileComponents();
    service = TestBed.inject(UserLocaleService);

    const lang = service.get();

    expect(lang).toBe(pl);
  });
});
