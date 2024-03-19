import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
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
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  async navigateToTimelineRoute(): Promise<boolean> {
    return this.navigate([`/${TIMELINE_PATH}`]);
  }

  async navigateToTableRoute(): Promise<boolean> {
    return this.navigate([`/${TABLE_PATH}`]);
  }

  async navigateToAddTaskRoute(): Promise<boolean> {
    return this.navigate([ADD_TASK_PATH], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  async navigateToEditTaskRoute(id: string): Promise<boolean> {
    return this.navigate([EDIT_TASK_PATH, id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  async navigateToDeleteTaskRoute(id: string): Promise<boolean> {
    return this.navigate([DELETE_TASK_PATH, id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  async navigateToConfigureRoute(): Promise<boolean> {
    return this.navigate([CONFIGURE_PATH], {
      relativeTo: this.activatedRoute,
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
    return this.navigate([EXPORT_TASKS_PATH], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  async navigateToImportTasksRoute(): Promise<boolean> {
    return this.navigate([IMPORT_TASKS_PATH], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  async navigateBack(): Promise<boolean> {
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
