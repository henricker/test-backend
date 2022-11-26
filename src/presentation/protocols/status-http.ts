import { HttpResponse } from './http';

export const badRequest = (error: string | string[]): HttpResponse => ({
  statusCode: 400,
  body: {
    message: Array.isArray(error) ? error.join(', ') : error,
  },
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    message: 'Internal server error',
  },
});

export const notFound = (message: string): HttpResponse => ({
  statusCode: 404,
  body: {
    message,
  },
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
