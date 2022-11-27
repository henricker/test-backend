import { describe, it } from '@jest/globals';
import { UserPrismaRepository } from '../../../../../src/infra/db/prisma/repositories/user-prisma-repository';
import { prismaMock } from '../../../mocks/infra/prisma-client.mock';
import { createUserMock } from '../../../mocks/entities/user-mock';

const makeSut = () => {
  const repository = new UserPrismaRepository(prismaMock as any);
  return {
    repository,
  };
};

describe('# Infra - Prisma - User Prisma Repository', () => {
  describe('createUser', () => {
    it('should call prisma.user.create with correct values', async () => {
      const { repository } = makeSut();
      const createSpy = jest.spyOn(prismaMock.user, 'create');

      await repository.createUser(createUserMock);

      expect(createSpy).toHaveBeenCalledWith({
        data: createUserMock,
      });
    });
    it('should throw if prisma.user.create throws', async () => {
      const { repository } = makeSut();
      jest
        .spyOn(prismaMock.user, 'create')
        .mockRejectedValueOnce(new Error() as never);

      const promise = repository.createUser(createUserMock);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('findUserByEmail', () => {
    it('should call prisma.user.findUnique with correct values', async () => {
      const { repository } = makeSut();
      const findUniqueSpy = jest.spyOn(prismaMock.user, 'findUnique');

      await repository.findUserByEmail(createUserMock.email);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { email: createUserMock.email },
      });
    });
    it('should throw if prisma.user.findUnique throws', async () => {
      const { repository } = makeSut();
      jest
        .spyOn(prismaMock.user, 'findUnique')
        .mockRejectedValueOnce(new Error() as never);

      const promise = repository.findUserByEmail(createUserMock.email);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('findUserByUsername', () => {
    it('should call prisma.user.findUnique with correct values', async () => {
      const { repository } = makeSut();
      const findUniqueSpy = jest.spyOn(prismaMock.user, 'findUnique');

      await repository.findUserByUsername(createUserMock.username);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { username: createUserMock.username },
      });
    });
    it('should throw if prisma.user.findUnique throws', async () => {
      const { repository } = makeSut();
      jest
        .spyOn(prismaMock.user, 'findUnique')
        .mockRejectedValueOnce(new Error() as never);

      const promise = repository.findUserByUsername(createUserMock.username);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('findUserByid', () => {
    it('should call prisma.user.findUnique with correct values', async () => {
      const { repository } = makeSut();
      const findUniqueSpy = jest.spyOn(prismaMock.user, 'findUnique');

      await repository.findUserById(1);

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
    it('should throw if prisma.user.findUnique throws', async () => {
      const { repository } = makeSut();
      jest
        .spyOn(prismaMock.user, 'findUnique')
        .mockRejectedValueOnce(new Error() as never);

      const promise = repository.findUserById(1);

      await expect(promise).rejects.toThrow();
    });
  });
});
