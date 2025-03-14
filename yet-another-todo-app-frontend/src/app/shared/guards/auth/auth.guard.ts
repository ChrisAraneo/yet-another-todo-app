import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, mapToCanActivate } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { SIGN_IN_PATH } from 'src/app/app-routing.consts';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private navigationService: NavigationService) {}

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

              return state.url.indexOf(`/${SIGN_IN_PATH}`) >= 0;
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
