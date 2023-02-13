import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import { CompletedTaskState } from 'src/app/models/task-state.model';
import { createTask, setTasks, updateTask } from 'src/app/store/actions/task.actions';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import { ApiClientService } from '../api-client/api-client.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private subscription = new Subscription();

  constructor(private store: Store<{ tasks: Task[] }>, private apiClientService: ApiClientService) {
    this.subscription.add(
      this.apiClientService.fetchTasksFromApi().subscribe((tasks: Task[] | undefined) => {
        if (tasks) {
          this.setTasks(tasks);
        }
      }),
    );

    this.subscription.add(
      this.getTasks().subscribe((tasks: Task[]) => this.apiClientService.postTasksToApi(tasks)),
    );
  }

  getTasks(): Observable<Task[]> {
    return this.store
      .select('tasks')
      .pipe(map((tasks) => (tasks || []).filter((task) => !task.getIsHidden())));
  }

  getHiddenTasks(): Observable<Task[]> {
    return this.store
      .select('tasks')
      .pipe(map((tasks) => (tasks || []).filter((task) => task.getIsHidden())));
  }

  addTask(task: Task): void {
    this.store.dispatch(createTask({ task }));
  }

  updateTask(task: Task): void {
    this.store.dispatch(updateTask({ task }));
  }

  completeTask(task: Task): void {
    const now = new Date();
    const updatedTask = new EndedTask(
      task.getTitle(),
      task.getDescription(),
      new CompletedTaskState(),
      task instanceof StartedTask ? task.getStartDate() : now,
      now,
      task.getCreationDate(),
      task.getId(),
    );

    this.updateTask(updatedTask);
  }

  hideTask(task: Task): void {
    const taskCopy = JSON.parse(JSON.stringify(task));
    const updatedTask = TaskCreator.create({ ...taskCopy, isHidden: true });

    this.updateTask(updatedTask);
  }

  unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
  }

  private setTasks(tasks: Task[]): void {
    return this.store.dispatch(setTasks({ tasks: tasks }));
  }
}
