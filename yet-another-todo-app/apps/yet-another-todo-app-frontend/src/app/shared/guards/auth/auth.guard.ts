import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  mapToCanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';

import { SIGN_IN_PATH } from '../../../app.routes';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private readonly userService: UserService,
    private readonly navigationService: NavigationService,
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> {
    return this.userService.getIsOfflineMode().pipe(
      mergeMap((isOfflineMode) =>
        this.userService.getIsUserLogged().pipe(
          map((isUserLogged) => !isOfflineMode && !isUserLogged),
          map((shouldRedirectToSignIn) => {
            if (shouldRedirectToSignIn) {
              this.navigationService.navigateToSignInRoute(state);

              return state.url.includes(`/${SIGN_IN_PATH}`);
            }
            return true;
          }),
        ),
      ),
    );
  }
}

export const canActivateAuth = mapToCanActivate([AuthGuard])[0];
