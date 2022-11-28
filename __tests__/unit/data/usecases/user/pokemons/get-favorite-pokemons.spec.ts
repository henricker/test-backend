import { UserMockRepository } from '../../../../mocks/repository/user-mock-repository';
import { DbGetFavoritePokemons } from '../../../../../../src/data/usecases/user/pokemon/db-get-favorite-pokemons';
import pokemonMock from '../../../../mocks/entities/pokemon-mock';

const makeSut = () => {
  const repository = new UserMockRepository();
  const usecase = new DbGetFavoritePokemons(repository);

  return {
    repository,
    usecase,
  };
};

describe('# Usecase - get favorite pokemons', () => {
  it('Should throw if repository throws', async () => {
    const { usecase, repository } = makeSut();
    jest
      .spyOn(repository, 'findFavoritesPokemons')
      .mockRejectedValueOnce(new Error());

    await expect(
      usecase.execute({ limit: 1, page: 1, name: 'bubasaur', userId: 1 })
    ).rejects.toThrow();
  });

  it('Should call repository with correct values', async () => {
    const { usecase, repository } = makeSut();
    const findFavoritesPokemonsSpy = jest.spyOn(
      repository,
      'findFavoritesPokemons'
    );

    await usecase.execute({ limit: 1, page: 1, name: 'bubasaur', userId: 1 });

    expect(findFavoritesPokemonsSpy).toHaveBeenCalledWith({
      limit: 1,
      page: 1,
      name: 'bubasaur',
      userId: 1,
    });
  });

  it('Should return pokemons with meta data pagination', async () => {
    const { usecase } = makeSut();

    const result = await usecase.execute({
      limit: 1,
      page: 1,
      name: 'bubasaur',
      userId: 1,
    });

    const expectedData = {
      data: [pokemonMock],
      meta: {
        total: 1,
        limit: 1,
        page: 1,
        hasNext: false,
      },
    };

    expect(result).toEqual(expectedData);
  });
});
