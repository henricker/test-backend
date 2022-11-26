import { describe, it } from '@jest/globals';
import { DbCreateUserUseCase } from '../../../../../src/data/usecases/user/db-create-user';
import { createUserMock, userMock } from '../../../mocks/entities/user-mock';
import { UserMockRepository } from '../../../mocks/repository/user-mock-repository';
import { HashMock } from '../../../mocks/usecase/protocols/hash-mock';
import { JwtMock } from '../../../mocks/usecase/protocols/jwt-mock';

const makeSut = () => {
  const hash = new HashMock();
  const jwt = new JwtMock();
  const repository = new UserMockRepository();
  const usecase = new DbCreateUserUseCase(repository, hash, jwt);

  return {
    repository,
    usecase,
    hash,
    jwt,
  };
};

describe('# Usecase - create user', () => {
  it('Should throw business error if email already in use', async () => {
    const { usecase } = makeSut();

    usecase.execute(createUserMock).catch((err) => {
      expect(err.message).toBe('Email already in use');
      expect(err.name).toBe('BusinessError');
    });
  });

  it('Should throw business error if username already in use', async () => {
    const { usecase, repository } = makeSut();
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);

    usecase.execute(createUserMock).catch((err) => {
      expect(err.message).toBe('Username already in use');
      expect(err.name).toBe('BusinessError');
    });
  });

  it('Should call hash service with correct password', async () => {
    const { usecase, repository, hash } = makeSut();
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'findUserByUsername').mockResolvedValueOnce(null);

    const hashSpy = jest.spyOn(hash, 'generateHash');

    await usecase.execute(createUserMock);

    expect(hashSpy).toHaveBeenCalledWith(createUserMock.password);
  });

  it('Should create user with password hashed', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'findUserByUsername').mockResolvedValueOnce(null);

    const createSpy = jest.spyOn(repository, 'createUser');

    await usecase.execute(createUserMock);

    expect(createSpy).toHaveBeenCalledWith({
      ...createUserMock,
      password: 'hashed',
    });
  });

  it('Should generate token jwt calling jwt service with correct id', async () => {
    const { usecase, repository, jwt } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'findUserByUsername').mockResolvedValueOnce(null);

    const jwtSpy = jest.spyOn(jwt, 'sign');

    await usecase.execute(createUserMock);

    expect(jwtSpy).toHaveBeenCalledWith({ id: userMock.id });
  });

  it('Should return user and token', async () => {
    const { usecase, repository } = makeSut();

    jest.spyOn(repository, 'findUserByEmail').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'findUserByUsername').mockResolvedValueOnce(null);

    const user = await usecase.execute(createUserMock);

    expect(user).toStrictEqual({
      user: userMock,
      token: 'token',
    });
  });
});
