import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActivateAuth } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = async (...guardParameters) =>
    TestBed.runInInjectionContext(async () =>
      canActivateAuth(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
