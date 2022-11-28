import { UserMockRepository } from '../../../../mocks/repository/user-mock-repository';
import { DbAddPokemonsFavorite } from '../../../../../../src/data/usecases/user/pokemon/db-add-pokemons-favorite';

const makeSut = () => {
  const repository = new UserMockRepository();
  const usecase = new DbAddPokemonsFavorite(repository);

  return {
    repository,
    usecase,
  };
};

describe('# Usecase - add favorite pokemons', () => {
  it('Should throw if repository throws', async () => {
    const { usecase, repository } = makeSut();
    jest
      .spyOn(repository, 'addPokemonsFavorite')
      .mockRejectedValueOnce(new Error());

    await expect(
      usecase.execute({ userId: 1, pokemonsId: [1] })
    ).rejects.toThrow();
  });

  it('Should call repository with correct values', async () => {
    const { usecase, repository } = makeSut();
    const addPokemonsFavoriteSpy = jest.spyOn(
      repository,
      'addPokemonsFavorite'
    );

    await usecase.execute({ userId: 1, pokemonsId: [1, 2] });

    expect(addPokemonsFavoriteSpy).toHaveBeenCalledWith({
      userId: 1,
      pokemonsId: [1, 2],
    });
  });
});
