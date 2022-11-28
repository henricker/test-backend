import { describe, it } from '@jest/globals';
import { CreateUserController } from '../../../../../src/presentation/controllers/user/create-user';
import { ValidatorMock } from '../../../mocks/validator/validator-mock';
import { createUserMock, userMock } from '../../../mocks/entities/user-mock';
import { CreateUserUseCaseMock } from '../../../mocks/usecase/user/create-user-use-case-mock';
import { BusinessError } from '../../../../../src/domain/errors/business-error';

const makeSut = () => {
  const validator = new ValidatorMock();
  const usecase = new CreateUserUseCaseMock();
  const controller = new CreateUserController(usecase, validator);

  return {
    controller,
    validator,
    usecase,
  };
};

describe('# Controller - create user', () => {
  const request = {
    body: createUserMock,
  };

  it('Should return 400 if validator returns an error', async () => {
    const { controller, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValueOnce('erro, erro');

    const response = await controller.handle({
      body: { ...request.body, username: undefined },
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: 'erro, erro',
    });
  });

  it('Should call create user use case with correct values', async () => {
    const { controller, usecase, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValueOnce(createUserMock);
    const spy = jest.spyOn(usecase, 'execute');
    await controller.handle(request);
    expect(spy).toHaveBeenCalledWith(createUserMock);
  });

  it('Should return 500 if create user use case throws', async () => {
    const { controller, usecase } = makeSut();

    jest.spyOn(usecase, 'execute').mockRejectedValueOnce(new Error() as never);

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({ message: 'Internal server error' });
  });

  it('Should return 400 if create user use case throws business error', async () => {
    const { controller, usecase } = makeSut();

    jest
      .spyOn(usecase, 'execute')
      .mockRejectedValueOnce(
        new BusinessError('Some business exception') as never
      );

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({ message: 'Some business exception' });
  });

  it('Should return 200 with user and jwt token', async () => {
    const { controller } = makeSut();

    const response = await controller.handle(request);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      user: { ...userMock, password: undefined },
      token: 'token',
    });
  });
});
