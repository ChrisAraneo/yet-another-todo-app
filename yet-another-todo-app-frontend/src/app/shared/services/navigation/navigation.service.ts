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

  async navigateBack(): Promise<boolean> {
    const urlParts = this.getUrlParts();

    // TODO Fix removing ids
    if (urlParts.length === 0 || urlParts.length === 1) {
      return this.navigate([TIMELINE_PATH]);
    }

    urlParts.pop();

    return this.navigate([...urlParts]);
  }

  async navigateToTimelineRoute(): Promise<boolean> {
    return this.navigate([TIMELINE_PATH]);
  }

  async navigateToTableRoute(): Promise<boolean> {
    return this.navigate([TABLE_PATH]);
  }

  async navigateToAddTaskRoute(): Promise<boolean> {
    return this.navigate([...this.getUrlParts(), ADD_TASK_PATH]);
  }

  async navigateToEditTaskRoute(id: string): Promise<boolean> {
    return this.navigate([...this.getUrlParts(), EDIT_TASK_PATH, id]);
  }

  async navigateToDeleteTaskRoute(id: string): Promise<boolean> {
    return this.navigate([...this.getUrlParts(), DELETE_TASK_PATH, id]);
  }

  async navigateToConfigureRoute(): Promise<boolean> {
    return this.navigate([...this.getUrlParts(), CONFIGURE_PATH]);
  }

  async navigateToSignInRoute(state: RouterStateSnapshot): Promise<boolean> {
    const urlParts = state.url.split('/').filter((part) => !!part);

    if (urlParts.indexOf(SIGN_IN_PATH) >= 0) {
      return true;
    }

    await this.router.navigate([...urlParts, SIGN_IN_PATH]);

    return false;
  }

  async navigateToExportTasksRoute(): Promise<boolean> {
    return this.navigate([...this.getUrlParts(), EXPORT_TASKS_PATH]);
  }

  async navigateToImportTasksRoute(): Promise<boolean> {
    return this.navigate([...this.getUrlParts(), IMPORT_TASKS_PATH]);
  }

  private navigate(paths: string[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(
      paths.filter((path) => !!path),
      extras,
    );
  }

  private getUrlParts(): string[] {
    return this.router.routerState.snapshot.url.split('/').filter((part) => !!part);
  }
}
