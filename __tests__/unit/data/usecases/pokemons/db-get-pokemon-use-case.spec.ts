import { describe, it } from '@jest/globals';
import { PokemonMockRepository } from '../../../mocks/repository/pokemon-mock-repository';
import { DbGetPokemonUseCase } from '../../../../../src/app/data/usecases/pokemons/db-get-pokemon-use-case';

const makeSut = () => {
  const repository = new PokemonMockRepository();
  const usecase = new DbGetPokemonUseCase(repository);

  return {
    repository,
    usecase,
  };
};

describe('# Usecase - get-pokemons', () => {
  it('Should call repository with correct params', async () => {
    const { repository, usecase } = makeSut();
    const getPokemonsSpy = jest.spyOn(repository, 'getPokemons');
    await usecase.execute({ limit: 1, page: 1 });
    expect(getPokemonsSpy).toHaveBeenCalledWith({ limit: 1, page: 1 });
  });
  it('Should throw if repository throws', async () => {
    const { repository, usecase } = makeSut();
    jest.spyOn(repository, 'getPokemons').mockRejectedValueOnce(() => {
      throw new Error();
    });

    await expect(usecase.execute({ limit: 1, page: 1 })).rejects.toThrow();
  });
  it('Should return correct data', () => {
    const { usecase } = makeSut();
    const result = usecase.execute({ limit: 1, page: 1 });
    expect(result).resolves.toStrictEqual({
      meta: {
        total: 1,
        limit: 1,
        page: 1,
        hasNext: false,
      },
      data: [
        {
          id: 1,
          pokedexNumber: 1,
          name: 'Bulbasaur',
        },
      ],
    });
  });
});
