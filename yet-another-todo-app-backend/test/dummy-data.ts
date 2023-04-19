import { TaskState as TaskStateSchema } from '@prisma/client';
import { Task } from 'src/models/tasks.type';
import { User } from 'src/models/user.type';

export class DummyData {
  public static readonly user: User = {
    id: '961d2c4d-8042-43a6-9a25-78d733094837',
    name: 'John Loremipsum',
    username: 'lorem_ipsum',
    password: 'Qwerty123/',
  };

  public static readonly taskStates: TaskStateSchema[] = [
    {
      id: '386db121-e9b7-4801-856a-10af38cc54d7',
      value: 'NOT_STARTED',
      iconName: 'auto_awesome',
      color: '#888888',
    },
    {
      id: '17fc6138-53c6-41d9-b3dd-83ef2ed032ab',
      value: 'IN_PROGRESS',
      iconName: 'autorenew',
      color: 'orange',
    },
    {
      id: '386db121-e9b7-4801-856a-10af38cc54d7',
      value: 'SUSPENDED',
      iconName: 'hourglass_empty',
      color: 'black',
    },
    {
      id: '09be771f-6df5-465e-a77a-0c002ca51278',
      value: 'COMPLETED',
      iconName: 'task_alt',
      color: '#69f0ae',
    },
    {
      id: '0ee65977-e7ff-4f94-aeb3-1b395b808637',
      value: 'REJECTED',
      iconName: 'not_interested',
      color: '#f44336',
    },
  ];

  public static readonly tasks: Task[] = [
    {
      creationDate: '2023-03-01T19:43:44.738Z',
      description:
        'Nam consectetur tempus hendrerit. Nullam pharetra, risus eget feugiat maximus, tellus magna dignissim eros, at pulvinar nisi purus vitae lectus.',
      id: '8e7f40b7-71a2-44fa-b112-8539c1cc068c',
      startDate: '2023-03-01T19:43:44.738Z',
      state: DummyData.taskStates.find(
        (state) => state.value === 'NOT_STARTED',
      ),
      title: 'Lorem ipsum dolor sit',
      isHidden: false,
    },
    {
      creationDate: '2023-03-02T15:45:44.738Z',
      description:
        'Proin nulla ligula, cursus vel sapien in, euismod placerat elit. Vestibulum volutpat lectus id tempor pellentesque. Vestibulum suscipit vulputate augue sit amet porttitor. Sed eget cursus tortor. Ut a enim et dolor aliquet interdum sit amet porttitor sem.',
      id: '8e7f40b7-71a2-44fa-b112-8539c1cc068c',
      startDate: '2023-03-02T16:45:44.738Z',
      state: DummyData.taskStates.find(
        (state) => state.value === 'NOT_STARTED',
      ),
      title: 'Curabitur ornare fringilla',
      isHidden: false,
    },
  ];
}
