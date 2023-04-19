import { Test, TestingModule } from '@nestjs/testing';
import {
  Task as TaskSchema,
  TaskState as TaskStateSchema,
} from '@prisma/client';
import { DummyData } from '../../test/dummy-data';
import { Task } from '../models/tasks.type';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            getTasksOfUser: jest.fn(
              async (username: string): Promise<TaskSchema[]> => {
                if (username === DummyData.user.username) {
                  return DummyData.schemaTasks;
                } else {
                  return [];
                }
              },
            ),
            getTaskOfUser: jest.fn(
              async (username: string, taskId: string): Promise<TaskSchema> => {
                if (username === DummyData.user.username) {
                  return DummyData.schemaTasks.find(
                    (task) => task.id === taskId,
                  );
                } else {
                  return undefined;
                }
              },
            ),
            getTaskStates: jest.fn(async (_): Promise<TaskStateSchema[]> => {
              return DummyData.schemaTaskStates;
            }),
            getTaskState: jest.fn(
              async (stateId: string): Promise<TaskStateSchema> => {
                return DummyData.schemaTaskStates.find(
                  (state) => state.id === stateId,
                );
              },
            ),
            createTask: jest.fn(
              async (username: string, task: Task): Promise<TaskSchema> => {
                if (
                  !!DummyData.schemaTasks.find((item) => item.id !== task.id)
                ) {
                  return {
                    ...task,
                    creationDate: task.creationDate
                      ? new Date(task.creationDate)
                      : null,
                    startDate: task.startDate ? new Date(task.startDate) : null,
                    endDate: task.endDate ? new Date(task.endDate) : null,
                    updateDate: new Date(2023, 5, 5),
                    userId:
                      DummyData.user.username === username
                        ? DummyData.user.id
                        : '00000000-1111-2222-3333-444444444444',
                    stateId: task.state.id,
                  };
                } else {
                  throw Error();
                }
              },
            ),
            removeTask: jest.fn(
              async (username: string, taskId: string): Promise<void> => {
                if (
                  username === DummyData.user.username &&
                  !!DummyData.schemaTasks.find((item) => item.id === taskId)
                ) {
                  return;
                } else {
                  throw new Error(
                    `Task with Id ${taskId} does not belong to the user ${username}`,
                  );
                }
              },
            ),
          },
        },
        TasksService,
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasksOfUser', () => {
    it('should return array of tasks if user has tasks', async () => {
      expect(await service.getTasksOfUser(DummyData.user.username)).toEqual(
        DummyData.tasks,
      );
    });

    it("should return empty array if user doesn't exist", async () => {
      expect(await service.getTasksOfUser('not_existing_username')).toEqual([]);
    });
  });

  describe('createOrUpdateTask', () => {
    it('should return new created task', async () => {
      const newTask: Task = {
        id: '11000011-1111-2222-3333-444444444444',
        title: 'Test',
        description: 'New task',
        state: DummyData.taskStates.find(
          (state) => state.value === 'COMPLETED',
        ),
        isHidden: false,
        creationDate: '2023-03-01T19:43:44.738Z',
        startDate: '2023-03-01T19:45:44.321Z',
        endDate: '2023-03-04T21:00:33.889Z',
      };

      expect(
        await service.createOrUpdateTask(DummyData.user.username, newTask),
      ).toEqual(newTask);
    });
  });

  describe('removeTask', () => {
    it('should return removed task', async () => {
      const task: Task = DummyData.tasks[0];

      expect(await service.removeTask(DummyData.user.username, task)).toEqual(
        task,
      );
    });

    it("should throw error if task doesn't belong to the user", async () => {
      const newTask: Task = {
        id: '11000011-1111-2222-3333-444444444444',
        title: 'Test',
        description: 'New task',
        state: DummyData.taskStates.find(
          (state) => state.value === 'COMPLETED',
        ),
        isHidden: false,
        creationDate: '2023-03-01T19:43:44.738Z',
        startDate: '2023-03-01T19:45:44.321Z',
        endDate: '2023-03-04T21:00:33.889Z',
      };

      await expect(
        service.removeTask(DummyData.user.username, newTask),
      ).rejects.toThrow(Error);
    });
  });
});
