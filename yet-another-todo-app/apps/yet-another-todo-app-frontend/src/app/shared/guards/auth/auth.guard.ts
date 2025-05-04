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
    private userService: UserService,
    private navigationService: NavigationService,
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> {
    return this.userService.getIsOfflineMode().pipe(
      mergeMap((isOfflineMode) => {
        return this.userService.getIsUserLogged().pipe(
          map((isUserLogged) => !isOfflineMode && !isUserLogged),
          map((shouldRedirectToSignIn) => {
            if (shouldRedirectToSignIn) {
              this.navigationService.navigateToSignInRoute(state);

              return state.url.includes(`/${SIGN_IN_PATH}`);
            } else {
              return true;
            }
          }),
        );
      }),
    );
  }
}

export const canActivateAuth = mapToCanActivate([AuthGuard])[0];
