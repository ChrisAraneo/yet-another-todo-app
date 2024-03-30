import { Injectable } from '@angular/core';
import { NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import {
  ADD_TASK_PATH,
  CONFIGURE_PATH,
  DELETE_TASK_PATH,
  EDIT_TASK_PATH,
  EXPORT_TASKS_PATH,
  IMPORT_TASKS_PATH,
  SIGN_IN_PATH,
  TABLE_PATH,
  TIMELINE_PATH,
} from 'src/app/app-routing.consts';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  async navigateToTimelineRoute(): Promise<boolean> {
    return this.navigate([`/${TIMELINE_PATH}`]);
  }

  async navigateToTableRoute(): Promise<boolean> {
    return this.navigate([`/${TABLE_PATH}`]);
  }

  async navigateToAddTaskRoute(): Promise<boolean> {
    return this.navigate([this.getFirstRootChild(), ADD_TASK_PATH], {
      queryParamsHandling: 'merge',
    });
  }

  async navigateToEditTaskRoute(id: string): Promise<boolean> {
    return this.navigate([this.getFirstRootChild(), EDIT_TASK_PATH, id], {
      queryParamsHandling: 'merge',
    });
  }

  async navigateToDeleteTaskRoute(id: string): Promise<boolean> {
    return this.navigate([this.getFirstRootChild(), DELETE_TASK_PATH, id], {
      queryParamsHandling: 'merge',
    });
  }

  async navigateToConfigureRoute(): Promise<boolean> {
    return this.navigate([this.getFirstRootChild(), CONFIGURE_PATH], {
      queryParamsHandling: 'merge',
    });
  }

  async navigateToSignInRoute(
    state: RouterStateSnapshot = this.router.routerState.snapshot,
  ): Promise<boolean> {
    const urlParts = state.url.split('/').filter((part) => !!part);

    if (urlParts.indexOf(SIGN_IN_PATH) >= 0) {
      return true;
    }

    await this.router.navigate([...urlParts, SIGN_IN_PATH]);

    return false;
  }

  async navigateToExportTasksRoute(): Promise<boolean> {
    return this.navigate([this.getFirstRootChild(), EXPORT_TASKS_PATH], {
      queryParamsHandling: 'merge',
    });
  }

  async navigateToImportTasksRoute(): Promise<boolean> {
    return this.navigate([this.getFirstRootChild(), IMPORT_TASKS_PATH], {
      queryParamsHandling: 'merge',
    });
  }

  async navigateBack(): Promise<boolean> {
    // TODO Use path from root?
    const urlParts = this.getRouteSnapshotUrlParts();
    const length = urlParts.length;

    if (length <= 1) {
      return this.navigateToTimelineRoute();
    }

    const lastPart = urlParts[length - 1];
    const secondToLastPart = urlParts[length - 2];

    if (
      (secondToLastPart === EDIT_TASK_PATH || secondToLastPart === DELETE_TASK_PATH) &&
      this.isPotentialUuid(lastPart)
    ) {
      urlParts.pop();
      urlParts.pop();
    } else {
      urlParts.pop();
    }

    return this.navigate([...urlParts]);
  }

  private navigate(paths: string[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(
      paths.filter((path) => !!path),
      extras,
    );
  }

  private getFirstRootChild(): string {
    return this.getRouteSnapshotUrlParts()[0];
  }

  private getRouteSnapshotUrlParts(): string[] {
    return this.router.routerState.snapshot.url.split('/').filter((part) => !!part);
  }

  private isPotentialUuid(value: string): boolean {
    // TODO Refactor
    return (
      value.replace('-', '').replace('-', '').replace('-', '').replace('-', '').length ===
      value.length - 4
    );
  }
}
