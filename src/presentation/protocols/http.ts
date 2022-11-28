import { IUser } from '../../domain/entities/user';

export type HttpRequest = {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  user?: Omit<IUser, 'password'>;
};

export type HttpResponse = {
  statusCode: number;
  body: any;
};
