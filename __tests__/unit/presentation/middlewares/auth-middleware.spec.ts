import { describe, it } from '@jest/globals';
import { BusinessError } from '../../../../src/domain/errors/business-error';
import { AuthMiddleware } from '../../../../src/presentation/middlewares/auth';
import { userMock } from '../../mocks/entities/user-mock';
import { GetUserByTokenUseCaseMock } from '../../mocks/usecase/user/get-user-by-token-mock';

const makeSut = () => {
  const usecase = new GetUserByTokenUseCaseMock();
  const middleware = new AuthMiddleware(usecase);

  return {
    usecase,
    middleware,
  };
};

describe('# Middleware - Auth', () => {
  it('Should throw if use case throws', async () => {
    const { middleware, usecase } = makeSut();

    const executeSpy = jest
      .spyOn(usecase, 'execute')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const response = await middleware.handle({
      headers: {
        authorization: 'Bearer token',
      },
    });

    expect(executeSpy).toHaveBeenCalledWith('token');
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });

  it('Should return 401 if usecase not return user', async () => {
    const { middleware, usecase } = makeSut();

    jest
      .spyOn(usecase, 'execute')
      .mockRejectedValueOnce(new BusinessError('Invalid token provided', 401));

    const response = await middleware.handle({
      headers: {
        authorization: 'Bearer token',
      },
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid token provided');
  });

  it('Should return 401 if token is not provided', async () => {
    const { middleware, usecase } = makeSut();

    const response = await middleware.handle({
      headers: {},
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid token provided');
  });

  it('Should return 200 and user if all is ok', async () => {
    const { middleware } = makeSut();

    const response = await middleware.handle({
      headers: {
        authorization: 'Bearer token',
      },
    });

    const expectedUser = { ...userMock };
    Reflect.deleteProperty(expectedUser, 'password');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedUser);
  });
});
