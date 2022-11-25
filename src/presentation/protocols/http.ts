export type HttpRequest = {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  user?: any;
};

export type HttpResponse = {
  statusCode: number;
  body: any;
};
