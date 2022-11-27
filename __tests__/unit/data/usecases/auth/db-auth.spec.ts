import { describe, it } from '@jest/globals';
import { DbAuthUseCase } from '../../../../../src/data/usecases/auth/db-auth';
import { BusinessError } from '../../../../../src/domain/errors/business-error';
import { userMock } from '../../../mocks/entities/user-mock';
import { UserMockRepository } from '../../../mocks/repository/user-mock-repository';
import { HashMock } from '../../../mocks/usecase/protocols/hash-mock';

import { JwtMock } from '../../../mocks/usecase/protocols/jwt-mock';

const makeSut = () => {
  const hash = new HashMock();
  const jwt = new JwtMock();
  const repository = new UserMockRepository();
  const useCase = new DbAuthUseCase(repository, hash, jwt);

  return {
    repository,
    useCase,
    hash,
    jwt,
  };
};

describe('# Usecase - Auth', () => {
  const params = {
    email: 'test@email.com',
    password: '123',
  };

  it('Should throw error if repository throws', async () => {
    const { useCase, repository } = makeSut();
    const findUserByEmailSpy = jest
      .spyOn(repository, 'findUserByEmail')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(useCase.execute(params)).rejects.toThrow();
    expect(findUserByEmailSpy).toHaveBeenCalledWith(params.email);
  });

  it('Should throw business error if user not found', async () => {
    const { repository, useCase } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);

    await expect(useCase.execute(params)).rejects.toEqual(
      new BusinessError('User not found', 404)
    );
  });

  it('Should throw if hash throws', async () => {
    const { useCase, hash } = makeSut();
    jest.spyOn(hash, 'compareHash').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(useCase.execute(params)).rejects.toThrow();
  });

  it('Should throw business error if password does not match', async () => {
    const { useCase, hash } = makeSut();

    const compareSpy = jest
      .spyOn(hash, 'compareHash')
      .mockResolvedValueOnce(false);

    await expect(useCase.execute(params)).rejects.toEqual(
      new BusinessError('Invalid password', 401)
    );

    expect(compareSpy).toHaveBeenCalledWith(params.password, 'hashedpassword');
  });

  it('Should throw if jwt throws', async () => {
    const { useCase, jwt } = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(useCase.execute(params)).rejects.toThrow();
    expect(signSpy).toHaveBeenCalledWith(1);
  });

  it('Should return token and user if everything is ok', async () => {
    const { useCase } = makeSut();

    const result = await useCase.execute(params);

    expect(result).toEqual({
      token: 'token',
      user: { ...userMock, password: undefined },
    });
  });
});
