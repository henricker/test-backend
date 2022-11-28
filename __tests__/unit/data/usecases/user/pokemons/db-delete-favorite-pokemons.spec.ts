import { describe, it } from '@jest/globals';
import { DbDeleteFavoritePokemons } from '../../../../../../src/data/usecases/user/pokemon/db-delete-favorite-pokemons';
import { UserMockRepository } from '../../../../mocks/repository/user-mock-repository';

const makeSut = () => {
  const repository = new UserMockRepository();
  const usecase = new DbDeleteFavoritePokemons(repository);

  return {
    repository,
    usecase,
  };
};

describe('# Usecase - delete favorite pokemons', () => {
  it('Should throw if repository throws', async () => {
    const { usecase, repository } = makeSut();
    jest
      .spyOn(repository, 'deleteFavoritePokemons')
      .mockRejectedValueOnce(new Error());

    await expect(
      usecase.execute({ userId: 1, pokemonsIds: [1] })
    ).rejects.toThrow();
  });

  it('Should call repository with correct values', async () => {
    const { usecase, repository } = makeSut();
    const spy = jest.spyOn(repository, 'deleteFavoritePokemons');

    await usecase.execute({ userId: 1, pokemonsIds: [1] });

    expect(spy).toHaveBeenCalledWith({ userId: 1, pokemonsIds: [1] });
  });
});
