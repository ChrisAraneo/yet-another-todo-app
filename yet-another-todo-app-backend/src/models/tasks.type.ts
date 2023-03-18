import { Response } from './response.type';

export type Tasks = Response<Task[]>;

export type Task = {
  id: string;
  title: string;
  description: string;
  state: {
    value: string;
    iconName: string;
    color: string;
    tooltipText: string;
  };
  userId: string;
  creationDate: string;
  startDate?: string;
  endDate?: string;
};
