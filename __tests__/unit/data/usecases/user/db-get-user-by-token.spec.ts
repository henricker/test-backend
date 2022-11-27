import { describe, it } from '@jest/globals';
import { DbGetUserByTokenUseCase } from '../../../../../src/data/usecases/user/db-get-user-by-token';
import { BusinessError } from '../../../../../src/domain/errors/business-error';
import { userMock } from '../../../mocks/entities/user-mock';
import { UserMockRepository } from '../../../mocks/repository/user-mock-repository';
import { JwtMock } from '../../../mocks/usecase/protocols/jwt-mock';

const makeSut = () => {
  const jwt = new JwtMock();
  const repository = new UserMockRepository();

  const usecase = new DbGetUserByTokenUseCase(repository, jwt);

  return {
    repository,
    usecase,
    jwt,
  };
};

describe('# Usecase - Get user by token', () => {
  it('Should throw if jwt service throws', async () => {
    const { usecase, jwt } = makeSut();

    const verifySpy = jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(usecase.execute('token')).rejects.toThrow();
    expect(verifySpy).toHaveBeenCalledWith('token');
  });

  it('Should throw if repository throws', async () => {
    const { usecase, repository, jwt } = makeSut();

    jest.spyOn(jwt, 'verify').mockReturnValueOnce(1 as never);

    const findUserByIdSpy = jest
      .spyOn(repository, 'findUserById')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(usecase.execute('token')).rejects.toThrow();
    expect(findUserByIdSpy).toHaveBeenCalledWith(1);
  });

  it('Should throw business error if user not found', async () => {
    const { usecase, repository, jwt } = makeSut();

    jest.spyOn(jwt, 'verify').mockReturnValueOnce(1 as never);

    const findUserSpy = jest
      .spyOn(repository, 'findUserById')
      .mockResolvedValueOnce(null);

    await expect(usecase.execute('token')).rejects.toThrowError(
      new BusinessError('Invalid token provided', 401)
    );
    expect(findUserSpy).toHaveBeenCalledWith(1);
  });

  it('Should return user if token is valid', async () => {
    const { usecase } = makeSut();

    const result = await usecase.execute('token');

    const expectData = { ...userMock };
    Reflect.deleteProperty(expect, 'password');

    expect(result).toStrictEqual(expectData);
  });
});
