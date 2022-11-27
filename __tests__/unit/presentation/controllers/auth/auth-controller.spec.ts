import { describe, it } from '@jest/globals';
import { AuthController } from '../../../../../src/presentation/controllers/auth/auth';
import { AuthMockUseCase } from '../../../mocks/usecase/auth/auth-mock-use-case';
import { ValidatorMock } from '../../../mocks/validator/validator-mock';
import { BusinessError } from '../../../../../src/domain/errors/business-error';
import { userMock } from '../../../mocks/entities/user-mock';

const makeSut = () => {
  const validator = new ValidatorMock();
  const usecase = new AuthMockUseCase();
  const controller = new AuthController(usecase, validator);

  return {
    controller,
    validator,
    usecase,
  };
};

describe('# Controller - Auth', () => {
  const request = {
    body: {
      email: 'email@email.com',
      password: 'password',
    },
  };

  it('Should return 500 if validator throws an error', async () => {
    const { controller, validator } = makeSut();

    jest.spyOn(validator, 'validate').mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(500);
  });

  it('Should return 400 if validator returns an error', async () => {
    const { controller, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValueOnce('erro, erro');

    const response = await controller.handle({
      body: { username: undefined, password: undefined },
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: 'erro, erro',
    });
  });

  it('Should return 401 if email not found by business error', async () => {
    const { controller, usecase } = makeSut();

    jest
      .spyOn(usecase, 'execute')
      .mockRejectedValueOnce(new BusinessError('User not found', 401));

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('User not found');
  });

  it('Should return 401 if password does not match by business error', async () => {
    const { controller, usecase } = makeSut();

    jest
      .spyOn(usecase, 'execute')
      .mockRejectedValueOnce(new BusinessError('Password does not match', 401));

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Password does not match');
  });

  it('Should return 500 if auth use case throws some server error', async () => {
    const { controller, usecase } = makeSut();

    jest.spyOn(usecase, 'execute').mockRejectedValueOnce(new Error());

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });

  it('Should return 200, token and user if auth use case returns success', async () => {
    const { controller } = makeSut();

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      user: {
        ...userMock,
        password: undefined,
      },
      token: 'token',
    });
  });
});
